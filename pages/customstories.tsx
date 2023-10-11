import * as React from "react";
import * as config from "../next.config.js";
import PageHeader from "./components/PageHeader";
import css from "../styles/customstories.module.scss";
import Footer from "./components/Footer/Footer";
import Autoplay from "./components/Autoplayslider/Autoplayslider";
import ReferNowPage from "./components/ReferNow/ReferNowPage";
import Warranty from "./components/warranty/Warranty";
import Guranted from "./components/Guranted/Guranted";
import FAQPage from "./components/Faq/FAQPage";
import { simpleCallInitAPI } from "../services/ApicallInit";
import DynamicIterableComponent from "./components/IterableComponent/DynamicIterableComponent";
import Link from "next/link.js";
import Ideas from "./components/MeetDesigner/ideas";
// import LivingRoomBanner from "./components/LivingRoom/LivingBanner";
import Autoplayservice from "./components/Customstories/Autoplayservice";
import ContentedLiving from "./components/contentedLiving/ContentedLiving";
import JoinPool from "./components/JoinPool/joinPool";
import Recentprojectnav from "./components/Tabsimage/recentprojectnav";
import RecentProject from "./components/Recentbanner/Recentprojectbanner";

const CustomStoriesPage: React.FC = () => {
    const living = React.useRef(null);
    const [screenwidth, setWidth] = React.useState(window.innerWidth);
    const [LivingRoom, setLivingRoom] = React.useState([]);

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
        let api = simpleCallInitAPI(`${assetpath}/assets/livingroom.json`);
        api.then((data: any) => {
            setLivingRoom(data.data.livingRoom);
        });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResized);
    }, [assetpath, handleResize, handleResized])

    return (
        <React.Fragment>
            <div className="animate-fade-in">
                <div className={css.lhomePage}>
                    <PageHeader screenwidth={screenwidth} screenheight={screenheight} assetpath={assetpath} hidden={false}/>
                    <div className={css.LhomeBottom}>
                        <div>
                            <RecentProject />
                        </div>
                        <div className={css.customstories}>
                            <div><Autoplayservice header="Last Month Projects" /></div>
                            <div><Autoplayservice header="Last 2 Month Projects" /></div>
                            <div><Autoplayservice header="6 months ago" /></div>
                            <div><ContentedLiving /></div>
                            <div><Warranty /></div>
                            <div><Footer /></div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CustomStoriesPage;