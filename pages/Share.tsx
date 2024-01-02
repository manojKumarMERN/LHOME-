import React from "react";
import css from '../styles/share.module.scss';
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
function Share() {
    const [copied, setCopied] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    const handleCopyClick = () => {
        if (inputValue !== '') {
            navigator.clipboard.writeText(inputValue)
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
            alert('URL is empty');
        }
    };
    React.useEffect(() => {
        const currentURL = window.location.href;
        setInputValue(currentURL);
    }, []);
    const handleSocialMediaClick = (socialMediaURL) => {
        window.open(socialMediaURL);
    };
    return (
        <>
            <div className={css.socialMedia}>
                <div className={css.socialMedia_icons_FB} onClick={() => handleSocialMediaClick(`https://www.facebook.com/share.php?u=${inputValue}`)}>
                    <FaFacebookF />
                </div>
                <div className={css.socialMedia_icons_IG} onClick={() => handleSocialMediaClick(`https://www.instagram.com/?url=${inputValue}`)}>
                    <FaInstagram />
                </div>
                <div className={css.socialMedia_icons_WA} onClick={() => handleSocialMediaClick(`https://api.whatsapp.com/send?text=${inputValue}`)}>
                    <FaWhatsapp />
                </div>
                <div className={css.socialMedia_icons_TX} onClick={() => handleSocialMediaClick(`https://twitter.com/intent/tweet?url=${inputValue}`)}>
                    <FaXTwitter />
                </div>
            </div>
            <div className={css.input_field}>
                <input value={inputValue}
                    className={css.referearnform_input}
                />
                <button className={copied ? css.copied : css.referearnform_copy_button} onClick={handleCopyClick}>{copied ? "COPIED" : "COPY LINK"}</button>
            </div>
        </>
    )
}
export default Share;