import React from 'react';
import leftvector from './components/loginRegister/leftvector.png';
import rightvector from './components/loginRegister/rightvector.png';
import Image from 'next/image';
import css from '../styles/loginRegister.module.scss';
import { AiFillGoogleCircle } from 'react-icons/ai';
import CustomDropdown from './components/loginRegister/CustomDropDown';

function LoginRegisterPage() {

    const [showLogin, setShowLogin] = React.useState(true);
    const [isChecked, setIsChecked] = React.useState<boolean>(false);
    const toggleForm = () => {
        setShowLogin(!showLogin);
    };
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
      };
      


    return (
        <>

            <div className={css.formLR}>
                <div className={css.loginLeftImage}>
                    <div className={css.emptybubble}></div>
                    <Image src={leftvector} alt='leftvector' />
                </div>
                {showLogin ? (<div className={css.formsofmodel}>
                    <div className={css.rightImage}>
                        <Image src={rightvector} alt='rightvector' />
                    </div>
                    <form className={css.form_content}>
                        <div className={css.mainContent}>
                            <h2>Login</h2>
                            <p>Enter your register mobile number</p>
                            <div className={css.inputAndbtn}>
                                <input type='number' className={css.LRInput} />
                                <button className={css.LoginButton}>LOGIN</button>
                            </div>
                            <p>Or Login With</p>
                            <div className={css.mainVal}>
                                <AiFillGoogleCircle size={30} color='#fff' />
                            </div>
                            <p>First time user? <span className={css.signupbtn} onClick={toggleForm} style={{ fontWeight: 'bold' }}>Sign up</span> here</p>
                        </div>
                    </form>
                </div>) :
                    (
                        <div className={css.formsofmodel}>
                            <div className={css.rightImage}>
                                <Image src={rightvector} alt='rightvector' />
                            </div>
                            <form className={css.form_content}>
                                <div className={css.mainContent}>
                                    <h2>Sign Up</h2>
                                    <div>
                                        <input type='text' className={css.SInput1} placeholder='Enter your name' />
                                        <div className={css.InputContainer}>
                                            <div className={css.dropdown_icon}><CustomDropdown /></div>
                                            <input type='tel' className={css.SInput2} placeholder='00000 00000' />
                                        </div>
                                        <div className={css.whatsapplabel}>
                                            <div className='w-full flex flex-col justify-center items-center'>
                                                <span className={css.label1}>you can reach me on whatsApp</span>
                                                <span className={css.label2}>opt for meeting and offer updates on WhatsApp</span>
                                            </div>
                                            <div className={css.whatsappcheckbox}>
                                            <input type="checkbox" className={css.SInput3} checked={isChecked} onChange={handleCheckboxChange} id="customCheckbox"/>
                                                <label htmlFor="customCheckbox"  className={css.checkmark}></label>
                                            </div>
                                        </div>
                                        <input type='text' className={css.SInput1} placeholder='Enter your email' />
                                        <button className={css.SignButton}>LOGIN</button>
                                    </div>
                                    <p>Or Login With</p>
                                    <div className={css.mainVal}>
                                        <AiFillGoogleCircle size={30} color='#fff' />
                                    </div>
                                    <p>First time user? <span onClick={toggleForm} style={{ fontWeight: 'bold' }}>log in </span> here</p>
                                </div>
                            </form>
                        </div>
                    )}

            </div>
        </>
    )
}

export default LoginRegisterPage;