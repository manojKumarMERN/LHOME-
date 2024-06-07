import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { AxiosService } from '../services/ApiService';
import { AUTH_TOKEN } from '../lib/constants';
import { login } from '../store/apps/auth';
import css from '../styles/loginRegister.module.scss';
import { TbReload } from 'react-icons/tb';
import { setToken } from '../store/apps/auth';

function OtpLoginform({ setShow, number, redirectToGetQuote }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(60);
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [isFromGetFreeEstimate, setIsFromGetFreeEstimate] = useState(false);

  useEffect(() => {
    if (redirectToGetQuote) {
      setIsFromGetFreeEstimate(true);
    }
  }, [redirectToGetQuote]);

  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const otpValue = event.target.value;
    setOtp(otpValue);
    if (otpError) {
      setOtpError('');
    }
  };

  const handleSubmit = async () => {
    if (otp.length !== 6 || isNaN(Number(otp))) {
      setOtpError('OTP must be a 6-digit number');
      return;
    }

    try {
      const response = await AxiosService.post('/user/validate-otp', {
        number,
        otp,
      });

      if (response.status === 200) {
        const { token} = response.data;
      
        // Store token in local storage and cookies
        setToken(token);
        Cookies.set(AUTH_TOKEN, token, { expires: 7, path: '/' });

        // Update Redux state
        dispatch(login({ token }));
        setShow(false);
        toast.success('Logged in successfully');
       

        // Redirect to appropriate page
        const role=response.data.user.role;
        if (role === 'admin') {
          router.push('/admindashboard');
        } else if (isFromGetFreeEstimate) {
          router.push('/getQuote');
        } else {
          router.push('/userdashboard');
        }
      } else {
        setOtpError(response.data.message || 'Failed to authenticate. Please try again.');
      }
    } catch (err) {
      console.error('Request failed:', err);
      toast.error('Failed to authenticate. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await AxiosService.post('/user/generate-otp', { number });
      if (response.status === 200) {
        setCount(60);
        toast.success('OTP resent successfully');
      } else {
        toast.error('Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      console.error('Request failed:', err);
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <form>
      <div className={css.Otp_heading}>Verify your number</div>
      <div className={css.otp_Box}>
        <p className={css.otp_box_content} style={{ padding: 0 }}>Phone Number: {number}</p>
        <p className={css.otp_box_content}>One Time Password</p>
        <input
          type='text'
          className={css.otp_input}
          placeholder='Enter OTP'
          name='otp'
          value={otp}
          onChange={handleOtpChange}
        />
        {otpError && <span className='text-red-500'>{otpError}</span>}
        <p className={css.otp_box_content}>Your OTP will expire in <span style={{ color: '#F44336' }}>00:{count < 10 ? `0${count}` : count}</span></p>
        <button type='button' onClick={handleSubmit} className={css.otp_button}>Submit</button><br />
        <div style={{ height: "35px" }}>
          {count === 0 && (
            <button type='button' className={css.otp_resend_button} onClick={handleResendOtp}>
              <TbReload /> Resend
            </button>
          )}
        </div>
      </div>
      <div className={css.otp_Verify_content}>We have sent OTP to your number, please verify</div>
    </form>
  );
}

export default OtpLoginform;

