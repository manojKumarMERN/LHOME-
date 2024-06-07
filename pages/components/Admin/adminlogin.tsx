import React, { useState } from 'react';
import css from '../Admin/adminlogin.module.scss';
import { AxiosService } from '../../../services/ApiService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const AdminLoginPage: React.FC = () => {
  const router = useRouter();
  const [number, setNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [numberError, setNumberError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    setNumber(value);
    setNumberError('');
  };

  const handleOtpChange = (event) => {
    const value = event.target.value;
    setOtp(value);
    setOtpError('');
  };

  const handleSendOtp = async () => {
    if (!number.trim() || number.length !== 10) {
      setNumberError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      const response = await AxiosService.post('/user/generate-otp', {
        number: number,
      });

      if (response.status === 200) {
        toast.success('OTP sent successfully');
        setOtpSent(true);
      }
    } catch (err) {
      console.error(err);
      setNumberError('Failed to send OTP. Please try again.');
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp.trim()) {
      setOtpError('Please enter the OTP');
      return;
    }

    try {
      const response = await AxiosService.post('/user/verify-otp', {
        number: number,
        otp: otp,
      });

      if (response.status === 200) {
        toast.success('Logged in successfully');
        router.push('/');
      }
    } catch (err) {
      console.error(err);
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className={css.container}>
      <form>
        <div className={css.admin_heading}>Admin Login</div>
        <div className={css.admin_Box}>
          {!otpSent ? (
            <>
              <input
                type='text'
                className={css.admin_input}
                placeholder='Enter your mobile number'
                value={number}
                onChange={handleNumberChange}
              />
              {numberError && <span className='text-red-500'>{numberError}</span>}
              <button type='button' onClick={handleSendOtp} className={css.admin_button}>Send OTP</button><br />
            </>
          ) : (
            <>
              <input
                type='text'
                className={css.admin_input}
                placeholder='Enter OTP'
                value={otp}
                onChange={handleOtpChange}
              />
              {otpError && <span className='text-red-500'>{otpError}</span>}
              <button type='button' onClick={handleOtpSubmit} className={css.admin_button}>Submit OTP</button><br />
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default AdminLoginPage;

