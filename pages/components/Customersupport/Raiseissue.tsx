import React from "react";
import css from "./Customersupport.module.scss";
import Button from 'react-bootstrap/Button';
import Image from "next/image";

const RaiseIssue = () => {
    return (
        <>
            <div className="container">
                <div className={css.Customersupportpage}>
                    <h5 className={css.head}>Reach out us</h5>
                    <div className={css.customlogo}>
                        <Image src={require("../../../public/assets/Tabimage/email.png")} alt="Email" className={css.referearn_socialicon} />
                        <Image src={require("../../../public/assets/Tabimage/WhatsAppicon.webp")} alt="WA" className={css.referearn_socialicon} />
                    </div>
                    <div className={css.customertext}>
                        <textarea className={css.texthere}>texthere..</textarea>
                    </div>
                    <div> <Button className={css.btncontrol} type="submit">Submit</Button></div>
                </div>
            </div>


        </>
    )
}
export default RaiseIssue;





















































































