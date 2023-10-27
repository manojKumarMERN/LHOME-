import React from 'react';
import leftvector from './components/loginRegister/leftvector.png';
import rightvector from './components/loginRegister/rightvector.png';
import Image from 'next/image';
import css from '../styles/loginRegister.module.scss';
import { IoLogoGoogle } from 'react-icons/io';
import ReactFlagsSelect from "react-flags-select";


function LoginRegisterPage() {

    const [showLogin, setShowLogin] = React.useState(true);
    const [isChecked, setIsChecked] = React.useState<boolean>(false);
    const toggleForm = () => {
        setShowLogin(!showLogin);
    };
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const [select, setSelect] = React.useState("IN");
    const onSelect = (code) => setSelect(code);

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
                                <IoLogoGoogle size={30} color='#2F52A4' className={css.G_icon} />
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
                                            <div className={css.dropdown_icon}>
                                            <ReactFlagsSelect
                                                selected={select}
                                                onSelect={onSelect}
                                                fullWidth={false}
                                                countries={["","IN","fi", "GB", "IE", "IT", "NL", "SE" ]}
                                                className={css.number_dropdown}
                                            /></div>
                                            <input type='tel' className={css.SInput2} placeholder='00000 00000' />
                                        </div>
                                        <div className={css.whatsapplabel}>
                                            <div className='w-full flex flex-col justify-center items-center'>
                                                <span className={css.label1}>you can reach me on whatsApp</span>
                                                <span className={css.label2}>opt for meeting and offer updates on WhatsApp</span>
                                            </div>
                                            <div className={css.whatsappcheckbox}>
                                                <input type="checkbox" className={css.SInput3} checked={isChecked} onChange={handleCheckboxChange} id="customCheckbox" />
                                                <label htmlFor="customCheckbox" className={css.checkmark}></label>
                                            </div>
                                        </div>
                                        <input type='text' className={css.SInput1} placeholder='Enter your email' />
                                        <button className={css.SignButton}>LOGIN</button>
                                    </div>
                                    <p>Or Login With</p>
                                    <div className={css.mainVal}>
                                        <IoLogoGoogle size={35} color='#2F52A4' className={css.G_icon} />
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