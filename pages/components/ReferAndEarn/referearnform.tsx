import React, { useState } from "react";
import css from "./referearnform.module.scss";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { toast } from "react-toastify";

const ReferEarnForm = () => {
    const [inputValue, setInputValue] = useState("");
    const [copied, setCopied] = useState(false);

    const handleCopyClick = () => {
        if (inputValue !== '') {
            navigator.clipboard.writeText(inputValue)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                        setInputValue('');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                });
        } else {
            toast('Generate a Link to copy');
        }
    };

    const generateReferralLink = (phone) => {
        const referralLink = `https://www.lhome.co.in`;
        setInputValue(referralLink);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        // Check if the input value is a 10-digit number
        if (/^\d{10}$/.test(value)) {
            generateReferralLink(value);
        } else {
            setInputValue(value);
        }
    };

    return (
        <>
            <div className={css.referearn_form}>
                <label className={css.referearnform_label}>Generate your referral link:</label>
                <div className={css.input_field}>
                    <input 
                        value={inputValue}
                        onChange={handleInputChange}
                        className={`placeholder-shown: border-[#D0D0D0]-200 p-3 ${css.referearnform_input}`}
                        placeholder="your phone number"
                    />
                    <button className={copied ? css.copied : css.referearnform_copy_button} onClick={handleCopyClick}>{ copied ? "COPIED" : "COPY LINK"}</button>
                </div>
                <div className={css.referearnform_additional_content1}>
                    <p className={css.referearnform_additional_content2}>Share the good word</p>
                </div>
                <div className={css.referearn_icondiv}>
                    <div className={css.socialMedia}>
                        <div className={css.socialMedia_icons}><FaFacebookF /></div>
                        <div className={css.socialMedia_icons}><FaInstagram /></div>
                        <div className={css.socialMedia_icons}><FaWhatsapp /></div>
                        <div className={css.socialMedia_icons}><FaTwitter /></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReferEarnForm;
