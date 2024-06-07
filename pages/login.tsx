import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import css from '../styles/loginRegister.module.scss';
import ReactFlagsSelect from "react-flags-select";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AxiosService } from '../services/ApiService'; 

const LoginSchema = Yup.object().shape({
    number: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
});

const Login = ({ toggleForm, otpForm, setOtpForm, select, onSelect, setNumber }) => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
          number: '',
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
          try {
            // Make API call to check user role
            const roleResponse = await AxiosService.post('/user/generate-otp', { number: values.number });

            if (roleResponse.data.role === 'admin') {
              // Redirect to admin login page
              router.push('/adminlogin');
            } else {
              // Generate OTP for customer
              setNumber(values.number);
              setOtpForm(!otpForm);
            }
          } catch (error) {
            console.error('Error:', error);

            if (error.response) {
              if (error.response.status === 400 && error.response.data === 'user not registered') {
                formik.setFieldError('number', 'Phone number is not registered');
              } else {
                console.error('Response error data:', error.response.data); // Additional debug log
              }
            } else if (error.request) {
              console.error('No response received:', error.request);
            } else {
              console.error('Error setting up the request:', error.message);
            }
          }
        },
    });

    const handleClick = (e) => {
        e.preventDefault();
        formik.handleSubmit();
    };

    const handleNumberChange = (e) => {
        const numericValue = e.target.value.replace(/\D/g, '');
        formik.setFieldValue(e.target.name, numericValue);
    };

    return (
        <div className={css.mainContent}>
            <h2>Login</h2>
            <p>Enter your registered mobile number</p>
            <div className={css.inputAndbtn}>
                <div className={css.dropdown_login_icon}>
                    <ReactFlagsSelect
                        selected={select}
                        onSelect={onSelect}
                        fullWidth={false}
                        countries={["IN", "FI", "GB", "IE", "IT", "NL", "SE"]}
                        className={css.number_dropdown}
                    />
                </div>
                <input 
                    type='text' 
                    inputMode='numeric' 
                    className={css.LRInput} 
                    placeholder='Enter your mobile number' 
                    name='number' 
                    onChange={handleNumberChange} 
                    onBlur={formik.handleBlur}
                    value={formik.values.number} 
                />
                {formik.touched.number && formik.errors.number ? (
                    <span className={css.errorText}>{formik.errors.number}</span>
                ) : null}
                <button type="button" className={css.LoginButton} onClick={handleClick}>LOGIN</button>
            </div>
            <p>Or Login With</p>
            <div className={css.mainVal}>
                <Image src={require("../public/assets/icons/Gicon.png")} className={css.G_icon} alt='g_icon' />
            </div>
            <p style={{ marginTop: 'unset' }}>
                First time user? 
                <span className={css.signupbtn} onClick={toggleForm} style={{ fontWeight: 'bold', cursor: 'pointer' }}>
                    Sign up
                </span> here
            </p>
        </div>
    );
}

export default Login;
