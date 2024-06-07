import React, { useState } from "react";
import css from "./referearnform.module.scss";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { toast } from "react-toastify";

const ReferEarnForm = () => {
    const [inputValue, setInputValue] = useState("");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");
    const [referralLink, setReferralLink] = useState("");
    const [linkGenerated, setLinkGenerated] = useState(false);

    const generateReferralLink = (phone) => {
        return `https://www.lhome.co.in`;
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    };

    const handleCopyClick = () => {
        if (referralLink) {
            navigator.clipboard.writeText(referralLink)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                });
        } else {
            toast('Generate a Link to copy');
        }
    };

    const handleGenerateLink = () => {
        if (inputValue.length !== 10 || !/^\d{10}$/.test(inputValue)) {
            setError("Please enter a valid phone number");
            return;
        }
        setReferralLink(generateReferralLink(inputValue));
        setLinkGenerated(true);
        setError(""); // Clear any previous errors
        setInputValue(""); // Clear input after generating link
    };

    return (
        <div className={css.referearn_form}>
            <label className={css.referearnform_label}>Generate your referral link:</label>
            <div className={css.input_field}>
                <input 
                    value={linkGenerated ? referralLink : inputValue}
                    onChange={handleInputChange}
                    className={`placeholder-shown: border-[#D0D0D0]-200 p-3 ${css.referearnform_input}`}
                    placeholder="Your Phone Number"
                />
                <button className={copied ? css.copied : css.referearnform_copy_button} onClick={linkGenerated ? handleCopyClick : handleGenerateLink}>{copied ? "COPIED" : linkGenerated ? "COPY LINK" : "GENERATE LINK"}</button>
            </div>
            {error && <p className={`${css.error_message} text-red-600 text-sm`}>{error}</p>}
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
    );
};

export default ReferEarnForm;
