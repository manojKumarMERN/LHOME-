import * as React from "react";
import * as config from "../next.config.js";
import PageHeader from "./components/PageHeader";
import css from "../styles/bedroom.module.scss";
import Footer from "./components/Footer/Footer";
import BedroomBanner from "./components/BedRoomBanner/bedroombanner";
import Autoplay from "./components/Autoplayslider/Autoplayslider";
import ReferNowPage from "./components/ReferNow/ReferNowPage";
import Warranty from "./components/warranty/Warranty";
import Guranted from "./components/Guranted/Guranted";
import FAQPage from "./components/Faq/FAQPage";
import Link from "next/link.js";
import Ideas from "./components/MeetDesigner/ideas";
import { simpleCallInitAPI } from "../services/ApicallInit";
import DynamicIterableComponent from "./components/IterableComponent/DynamicIterableComponent";

const ModularKitchenPage: React.FC = () => {
    const living = React.useRef(null);
    const [bedroom, setbedroom] = React.useState([]);
    const [screenwidth, setWidth] = React.useState(window.innerWidth);
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
    let hgtt = 0;
    if (window.innerWidth < 600) {
        hgtt = window.innerHeight - 210;
        if (window.innerWidth > 490 && window.innerWidth < 512) {
            hgtt += 10;
        }
    } else {
        hgtt = window.innerHeight - 160;
    }
    const [screenheight, setHeight] = React.useState(hgtt);


    const handleResize = React.useCallback(() => {
        setWidth(window.innerWidth);
        let hgtt = 0;
        if (window.innerWidth < 600) {
            hgtt = window.innerHeight - 210;
            if (window.innerWidth > 490 && window.innerWidth < 512) {
                hgtt += 10;
            }
            if (window.innerWidth > 571 && window.innerWidth < 599) {
                hgtt += 50;
            }
            if (window.innerWidth > 570 && window.innerWidth < 572) {
                hgtt += 45;
            }
            if (window.innerWidth > 509 && window.innerWidth < 571) {
                hgtt += 25;
            }
            if (window.innerWidth > 500 && window.innerWidth < 510) {
                hgtt += 15;
            }
            if (window.innerWidth < 500) {
                hgtt -= 10;
            }
        } else {
            hgtt = window.innerHeight - 160;
        }
        setHeight(hgtt);
    }, []);

    const handleResized = React.useCallback(() => {
        setTimeout(() => {
            handleResize();
        }, 1000);
    }, [handleResize]);

    React.useEffect(() => {
        let api = simpleCallInitAPI(`${assetpath}/assets/bedroom.json`);
        api.then((data: any) => {
            setbedroom(data.data.Bedroom);
        });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResized);
    }, [ handleResize, handleResized])

    return (
        <React.Fragment>
            <div className="animate-fade-in">
                <div className={css.lhomePage}>
                    <PageHeader screenwidth={screenwidth} screenheight={screenheight} assetpath={assetpath} hidden={false}/>
                    <div className={css.LhomeBottom}>
                        <div><BedroomBanner /></div>

                        <div className={css.bedroom_bgclr}>
                <div className={css.bedroom_filter_home}>
                <div className="pt-4">
                  <span className={css.bedroom_filter_link_span1}><Link href={{ pathname: "/" }} className={css.bedroom_filter_link}>home</Link></span>
                  <span className={css.bedroom_filter_slash}>/</span>
                  <span className={css.bedroom_filter_link_span2}><Link href={{ pathname: "/bedroom" }} className={css.bedroom_filter_link}>bedroom</Link></span>
                </div>
                <div className={css.bedroom_filter_header_content}>Bed Room</div>
                <div className="row ">
                <div className="col-lg-3 "> </div>

                <div className={"col-lg-6 px-[15px] " + css.bedroom_filter_content}><p className={css.bedroom_filter_additional_content}>Transform your kitchen to the heart of your home with the help of LHome.
                  From coffee dates to dinner parties, our end-to-end design and installation
                  services will turn your kitchen into a stylish and functional space.</p>
                  </div>
                  <div className="col-lg-3 "></div>
                  
                  </div>
                  <div><Ideas prop = "Bed Room" color="red"/></div>
                  </div>
                  </div>
                        <div className="mt-[-5%]"><DynamicIterableComponent data={bedroom} /></div>
                        <div className="mb-[-50px]"><Autoplay living={living} /></div>
                        <div><ReferNowPage /></div>
                        <div><Warranty /></div>
                        <div><FAQPage /></div>
                        <div><Guranted /></div>
                        <div><Footer /></div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}
export default ModularKitchenPage;
