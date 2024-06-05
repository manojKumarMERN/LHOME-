import React from 'react';
import leftvector from './components/loginRegister/leftvector.png';
import Image from 'next/image';
import css from '../styles/loginRegister.module.scss';
import { TbReload } from "react-icons/tb";
import Registerpage from './Registerpage';
import Login from './login';
import OtpLoginform from './otpForm';

function LoginRegisterPage({ setShow, currentPage }) {
    const [showLogin, setShowLogin] = React.useState(true);
    const [number, setNumber] = React.useState<number>(6379649524);
    const [select, setSelect] = React.useState("IN");

    const onSelect = (code) => setSelect(code)

    const toggleForm = () => {
        setShowLogin(!showLogin);
    };

    const [otpForm, setOtpForm] = React.useState(true);

    return (
        <>
            <div className={css.formLR}>
                <div className={css.loginLeftImage}>
                    <div className={css.emptybubble}></div>
                    <Image src={leftvector} alt='leftvector' className={css.Left_vector} />
                </div>
                {showLogin ? (
                    <div className={css.formsofmodel}>
                        <form className={css.form_content}>
                            {otpForm ? (
                                <Login toggleForm={toggleForm} otpForm={otpForm} setOtpForm={setOtpForm} select={select} onSelect={onSelect} setNumber={setNumber} />
                            ) : (
                                <OtpLoginform setShow={setShow} number={number} redirectToGetQuote={currentPage === "getEstimate"} />
                            )}
                        </form>
                    </div>
                ) : (
                    <Registerpage toggleForm={toggleForm} setShow={setShow} />
                )}
            </div>
        </>
    )
}

export default LoginRegisterPage;

