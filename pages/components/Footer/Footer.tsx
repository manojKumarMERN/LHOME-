import * as React from "react";
import css from './Footer.module.scss';
import * as config from "../../../next.config.js";
import { simpleCallInitAPI } from '../../../services/ApicallInit';

const Footer: React.FC = () => {
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
    const [socialMediaList, setSocialMediaList] = React.useState([]);
    const [mobile, setMobile] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [mail, setMail] = React.useState("");
    const [Logo,setLogo]=React.useState("");

    React.useEffect(() => {
        let api = simpleCallInitAPI(`${assetpath}/assets/settings.json`);
        api.then((data: any) => {
            let socialMediaIcons = [];
            data.data.settings.socialMediaIcons.forEach((datas: any) => {
                let lc: any = {};
                lc.image = `${assetpath}${datas.iconsList1}`;
                socialMediaIcons.push(lc);
            });

            setSocialMediaList(socialMediaIcons);
            setLogo(`${assetpath}${data.data.settings.logo}`);
            setMobile(`${assetpath}${data.data.settings.mobile}`);
            setLocation(`${assetpath}${data.data.settings.location}`);
            setMail(`${assetpath}${data.data.settings.mail}`);
        })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <React.Fragment>
            <div className={css.footer}>

                <div className={css.footerInnerLayer}>

                    <div className={css.footerLeftContent}>

                        <div id="logo" className={`${css.lhomelogoholder}`}>
                            <div className={css.lhomelogo}>
                                <img  alt="logo" src={Logo} key={"uniqueKey"}/>
                            </div>
                        </div>

                        <div className={css.socialMedia}>
                            {
                                socialMediaList.map((datas: any, index: number) =>
                                    <img key={index} className={css.socialMediaIcons} src={datas.image} alt="anything" />
                                )
                            }
                        </div>

                        <div className={css.footerContentSubContent}>
                            <div><img className={css.footerContentSubContentIcon} src={mobile} alt="M:" />0000-000-0000</div>
                            <div><img className={css.footerContentSubContentIcon} src={location} alt="L:" />Coimbatore | Rajapalayam</div>
                            <div><img className={css.footerContentSubContentIcon} src={mail} alt="E-Mail:" />dummy@gmail.com</div>
                        </div>

                    </div>
                    
                    <div className={css.footerContent}>
                        <div className={css.footerContentHeader}>Lhome</div>
                        <div className={css.footerContentSubContent}>
                            <div>Team</div>
                            <div>Join Us</div>
                            <div>Privacy Policy</div>
                            <div>Refer and Earn</div>
                            <div>Disclaimer</div>
                        </div>
                    </div>

                    <div className={css.footerContent}>
                        <div className={css.footerContentHeader}>Customer Support</div>
                        <div className={css.footerContentSubContent}>
                            <div>Raise issue</div>
                            <div>My issues</div>
                            <div>Contact us</div>
                            <div>Get Estimate</div>
                            <div>FAQs</div>
                        </div>
                    </div>

                    <div className={css.footerContent}>
                        <div className={css.footerContentHeader}>The Design Journal</div>
                        <div className={css.footerContentSubContent}>
                            <div>Buying Guides</div>
                            <div>Style Your Home</div>
                            <div>Interior 101</div>
                            <div>Interiors By LHome</div>
                            <div>Lhome in Your City</div>
                        </div>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Footer;
