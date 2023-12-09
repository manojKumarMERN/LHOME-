import React from "react";
import css from "./referearnform.module.scss";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const ReferEarnForm = () => {
    const [inputValue, setInputValue] = React.useState("https://www.lhome.co.in");
    const [displayValue, setDisplayValue] = React.useState(""); // State to display input value
  
    const handleCopyClick = () => {
      navigator.clipboard.writeText(inputValue)
        .then(() => {
          console.log('URL copied to clipboard:', inputValue);
        })
        .catch(err => {
          console.error('Failed to copy:', err);
        });
    };
  
    const handleGenerateLinkClick = () => {
      setDisplayValue(inputValue); // Set display value after button click
    };
    return (
        <>
            <div className={css.referearn_form}>
                <label className={css.referearnform_label}>Generate your referral link:</label>
                <div className={css.input_field}>
                    <input value={inputValue}
                        className={`placeholder-shown: border-[#D0D0D0]-200 p-3 ${css.referearnform_input}`}
                    />
                    <button className={css.referearnform_copy_button} onClick={handleCopyClick}>COPY LINK</button>
                </div>
                <div className={css.referearnform_button}>
                    <button className={css.referearnform_button_content} onClick={handleGenerateLinkClick}><p className={css.referearnform_button_text}>GENERATE LINK</p></button>
                </div>
                <div className={css.referearnform_additional_content1}>
                    <p className={css.referearnform_additional_content2}>Share the good word</p>
                </div>
                <div className={css.referearn_icondiv}>
                    <div className={css.socialMedia}>
                        <div className={css.socialMedia_icons}><FaFacebookF /></div>
                        <div className={css.socialMedia_icons}><FaInstagram /></div>
                        <div className={css.socialMedia_icons}><FaWhatsapp /></div>
                        <div className={css.socialMedia_icons}><FaXTwitter /></div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default ReferEarnForm;