import React from 'react';
import css from '../styles/loginRegister.module.scss';
import { TbReload } from 'react-icons/tb';
import { AxiosService } from '../services/ApiService';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

function OtpLoginform({ setShow, number }) {

  const [count, setCount] = React.useState<number>(60);
  const [otp, setOtp] = React.useState<string>('');
  const [otpError, setOtpError] = React.useState<string>('');

  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const otpValue = event.target.value;
    setOtp(otpValue);
    if (otpError) {
      setOtpError(''); 
    }
  };

  const handleSubmit = async () => {
    // console.log(1);
    
    if (otp.length !== 6 || isNaN(Number(otp))) {
      setOtpError('OTP must be a 6-digit number');
      return; 
    }

    try {
      const response = await AxiosService.post('/signin/auth', {
        number: number,
        otp: Number(otp),
      })
      if(response.status == 201){
      const { user, token } = response.data;
      Cookies.set('userId', user.id, { expires: 7, path: '/' });
      Cookies.set('token', token, { expires: 7, path: '/' });
      setShow(false);
      toast.success('Logged in successfully');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to authenticate. Please try again.');
    }
  };

  React.useEffect(() => {
    count > 0 && setTimeout(() => setCount(count - 1), 1000);
  }, [count]);

  return (
    <>
      <form >
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
          <p className={css.otp_box_content}>Your OTP will expire in <span style={{ color: '#F44336' }}>00.{count}</span></p>
          <button type='button' onClick={handleSubmit} className={css.otp_button} >Submit</button><br />
          <div style={{ height: "35px" }}>{count === 0 && <button type='button' className={css.otp_resend_button}><TbReload /> Resend</button>}</div>
        </div>
        <div className={css.otp_Verify_content}>We have sent OTP to your number, please verify</div>
      </form>
    </>
  )
}

export default OtpLoginform;
