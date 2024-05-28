import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { AxiosService } from '../services/ApiService';
import { AUTH_TOKEN } from '../lib/constants';
// import { setTokenInLocalStorage, getToken } from '../services/sessionProvider';
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
        const { token } = response.data;

        // Store token in local storage and cookies
        // setTokenInLocalStorage(token);
        setToken(token);
        Cookies.set(AUTH_TOKEN, token, { expires: 7, path: '/' });

        // Update Redux state
        dispatch(login({ token }));
        setShow(false);
        toast.success('Logged in successfully');

        // Redirect to appropriate page
        if (isFromGetFreeEstimate) {
          router.push('/getQuote');
        } else {
          router.push('/');
        }
      } else {
        setOtpError(response.data.message || 'Failed to authenticate. Please try again.');
      }
    } catch (err) {
      console.error('Request failed:', err);
      toast.error('Failed to authenticate. Please try again.');
    }
  };

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => setCount(count - 1), 1000);
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
        <p className={css.otp_box_content}>Your OTP will expire in <span style={{ color: '#F44336' }}>00.{count}</span></p>
        <button type='button' onClick={handleSubmit} className={css.otp_button}>Submit</button><br />
        <div style={{ height: "35px" }}>{count === 0 && <button type='button' className={css.otp_resend_button}><TbReload /> Resend</button>}</div>
      </div>
      <div className={css.otp_Verify_content}>We have sent OTP to your number, please verify</div>
    </form>
  );
}

export default OtpLoginform;


// import React from 'react';
// import css from '../styles/loginRegister.module.scss';
// import { TbReload } from 'react-icons/tb';
// import { AxiosService } from '../services/ApiService';
// import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/router';
// import { login } from '../store/apps/auth';
// import { useDispatch } from 'react-redux';
// import { AUTH_TOKEN } from '../lib/constants';
// import { getToken } from '../services/sessionProvider';
// import {setTokenInLocalStorage} from '../services/sessionProvider'

// function OtpLoginform({ setShow, number, redirectToGetQuote }) {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const [count, setCount] = React.useState<number>(60);
//   const [otp, setOtp] = React.useState<string>('');
//   const [otpError, setOtpError] = React.useState<string>('');
//   const [isFromGetFreeEstimate, setIsFromGetFreeEstimate] = React.useState(false);
//   const token = getToken(); // Example variable declaration

//   React.useEffect(() => {
//     if (redirectToGetQuote) {
//       setIsFromGetFreeEstimate(true);
//     }
//   }, [redirectToGetQuote]);

//   const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const otpValue = event.target.value;
//     setOtp(otpValue);
//     if (otpError) {
//       setOtpError('');
//     }
//   };

//   const handleSubmit = async () => {
//     if (otp.length !== 6 || isNaN(Number(otp))) {
//       setOtpError('OTP must be a 6-digit number');
//       return;
//     }

//     try {
//       const response = await AxiosService.post('/user/validate-otp', {
//         number: number,
//         otp: otp,},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Add the authorization header with the token
//           },
//       });

//       if (response.status === 200) {
//         const { user, token } = response.data;

//         // Store token in local storage
//         setTokenInLocalStorage.setItem(AUTH_TOKEN, token);

//         // Store token in cookies if needed
//         // Cookies.set(AUTH_TOKEN, token, { expires: 7, path: '/' });

//         dispatch(login(token));
//         setShow(false);
//         toast.success('Logged in successfully');

//         // Redirect to appropriate page
//         if (isFromGetFreeEstimate) {
//           router.push('/getQuote');
//         } else {
//           router.push('/');
//         }
//       } else {
//         setOtpError(response.data.message || 'Failed to authenticate. Please try again.');
//       }
//     } catch (err) {
//       console.error('Request failed:', err);
//       toast.error('Failed to authenticate. Please try again.');
//     }
//   };

//   React.useEffect(() => {
//     count > 0 && setTimeout(() => setCount(count - 1), 1000);
//   }, [count]);

//   return (
//     <>
//       <form>
//         <div className={css.Otp_heading}>Verify your number</div>
//         <div className={css.otp_Box}>
//           <p className={css.otp_box_content} style={{ padding: 0 }}>Phone Number: {number}</p>
//           <p className={css.otp_box_content}>One Time Password</p>
//           <input
//             type='text'
//             className={css.otp_input}
//             placeholder='Enter OTP'
//             name='otp'
//             value={otp}
//             onChange={handleOtpChange}
//           />
//           {otpError && <span className='text-red-500'>{otpError}</span>}
//           <p className={css.otp_box_content}>Your OTP will expire in <span style={{ color: '#F44336' }}>00.{count}</span></p>
//           <button type='button' onClick={handleSubmit} className={css.otp_button} >Submit</button><br />
//           <div style={{ height: "35px" }}>{count === 0 && <button type='button' className={css.otp_resend_button}><TbReload /> Resend</button>}</div>
//         </div>
//         <div className={css.otp_Verify_content}>We have sent OTP to your number, please verify</div>
//       </form>
//     </>
//   );
// }

// export default OtpLoginform;


// import React from 'react';
// import css from '../styles/loginRegister.module.scss';
// import { TbReload } from 'react-icons/tb';
// import { AxiosService } from '../services/ApiService';
// import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/router';
// import { login } from '../store/apps/auth';
// import {useSelector , useDispatch} from 'react-redux';
// import { AUTH_TOKEN } from '../lib/constants';


// function OtpLoginform({ setShow, number, redirectToGetQuote }) {
//   const router = useRouter();

//   const [count, setCount] = React.useState<number>(60);
//   const [otp, setOtp] = React.useState<string>('');
//   const [otpError, setOtpError] = React.useState<string>('');
//   const [isFromGetFreeEstimate, setIsFromGetFreeEstimate] = React.useState(false);
// const dispatch = useDispatch();

//   React.useEffect(() => {
//     if (redirectToGetQuote) {
//       setIsFromGetFreeEstimate(true);
//     }
//   }, [redirectToGetQuote]);

//   const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const otpValue = event.target.value;
//     setOtp(otpValue);
//     if (otpError) {
//       setOtpError('');
//     }
//   };

// const handleSubmit = async () => {
//   if (otp.length !== 6 || isNaN(Number(otp))) {
//     setOtpError('OTP must be a 6-digit number');
//     return;
//   }

//   try {
//     const response = await AxiosService.post('/user/validate-otp', {
//       number: number,
//       otp: otp,
//     });
//     console.log(response)
//     if (response.status == 200) {
//       const {  user,token } = response.data;
//       localStorage.setItem(AUTH_TOKEN, token);
//       // Cookies.set('userId', user, { expires: 7, path: '/' });
//       Cookies.set(AUTH_TOKEN, token, { expires: 7, path: '/' });
//       dispatch(login(true));
//       setShow(false);
//       toast.success('Logged in successfully');

//       // Redirect to appropriate page
//       if (isFromGetFreeEstimate) {
//         router.push('/getQuote');
//       } else {
//         router.push('/');
//       }
//     } else {
//       setOtpError(response.data.message || 'Failed to authenticate. Please try again.');
//     }
//   } catch (err) {
//     console.error('Request failed:', err);
//     toast.error('Failed to authenticate. Please try again.');
//   }
// };


//   React.useEffect(() => {
//     count > 0 && setTimeout(() => setCount(count - 1), 1000);
//   }, [count]);

//   return (
//     <>
//       <form>
//         <div className={css.Otp_heading}>Verify your number</div>
//         <div className={css.otp_Box}>
//           <p className={css.otp_box_content} style={{ padding: 0 }}>Phone Number: {number}</p>
//           <p className={css.otp_box_content}>One Time Password</p>
//           <input
//             type='text'
//             className={css.otp_input}
//             placeholder='Enter OTP'
//             name='otp'
//             value={otp}
//             onChange={handleOtpChange}
//           />
//           {otpError && <span className='text-red-500'>{otpError}</span>}
//           <p className={css.otp_box_content}>Your OTP will expire in <span style={{ color: '#F44336' }}>00.{count}</span></p>
//           <button type='button' onClick={handleSubmit} className={css.otp_button} >Submit</button><br />
//           <div style={{ height: "35px" }}>{count === 0 && <button type='button' className={css.otp_resend_button}><TbReload /> Resend</button>}</div>
//         </div>
//         <div className={css.otp_Verify_content}>We have sent OTP to your number, please verify</div>
//       </form>
//     </>
//   );
// }

// export default OtpLoginform;



// import React from 'react';
// import css from '../styles/loginRegister.module.scss';
// import { TbReload } from 'react-icons/tb';
// import { AxiosService } from '../services/ApiService';
// import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/router';

// function OtpLoginform({ setShow, number ,redirectToGetQuote}) {
//   const router = useRouter();

//   const [count, setCount] = React.useState<number>(60);
//   const [otp, setOtp] = React.useState<string>('');
//   const [otpError, setOtpError] = React.useState<string>('');
//   const [isFromGetFreeEstimate, setIsFromGetFreeEstimate] = React.useState(false);

//   React.useEffect(() => {
//     if (redirectToGetQuote) {
//       setIsFromGetFreeEstimate(true);
//     }
//   }, [redirectToGetQuote]);

//   const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const otpValue = event.target.value;
//     setOtp(otpValue);
//     if (otpError) {
//       setOtpError(''); 
//     }
//   };

//   const handleSubmit = async () => {
//     if (otp.length !== 6 || isNaN(Number(otp))) {
//       setOtpError('OTP must be a 6-digit number');
//       return; 
//     }

//     try {
//       const response = await AxiosService.post('/user/validate-otp', {
//         number: number,
//         otp: Number(otp),
//       });

//       if (response.status === 201) {
//         const { user, token } = response.data;
//         Cookies.set('userId', user.id, { expires: 7, path: '/' });
//         Cookies.set('token', token, { expires: 7, path: '/' });
//         setShow(false);
//         toast.success('Logged in successfully');

//         // Redirect based on the condition
//          if (isFromGetFreeEstimate) {
//           router.push('/getQuote');
//         } else {
//           // Check if cookies are present
//           const userId = Cookies.get('userId');
//           const token = Cookies.get('token');

//           // Clear cookies and redirect to home page if cookies are empty
//           if (!userId || !token) {
//             Cookies.remove('userId');
//             Cookies.remove('token');
//             router.push('/');
//           }
//         }
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error('Failed to authenticate. Please try again.');
//     }
//   };

//   React.useEffect(() => {
//     count > 0 && setTimeout(() => setCount(count - 1), 1000);
//   }, [count]);

//   return (
//     <>
// <form >
//         <div className={css.Otp_heading}>Verify your number</div>
//         <div className={css.otp_Box}>
//           <p className={css.otp_box_content} style={{ padding: 0 }}>Phone Number: {number}</p>
//           <p className={css.otp_box_content}>One Time Password</p>
//           <input
//             type='text'
//             className={css.otp_input}
//             placeholder='Enter OTP'
//             name='otp'
//             value={otp}
//             onChange={handleOtpChange}
//           />
//           {otpError && <span className='text-red-500'>{otpError}</span>}
//           <p className={css.otp_box_content}>Your OTP will expire in <span style={{ color: '#F44336' }}>00.{count}</span></p>
//           <button type='button' onClick={handleSubmit} className={css.otp_button} >Submit</button><br />
//           <div style={{ height: "35px" }}>{count === 0 && <button type='button' className={css.otp_resend_button}><TbReload /> Resend</button>}</div>
//         </div>
//         <div className={css.otp_Verify_content}>We have sent OTP to your number, please verify</div>
//       </form>
//     </>
//   );
// }

// export default OtpLoginform;
