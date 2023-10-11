
import * as React from "react";
import ReferNowPage from "./components/ReferNow/ReferNowPage";
import NRIFriendly from "./components/NRIFriendly/NRIFriendly";
import Footer from "./components/Footer/Footer";
import InteriorDesign from "./components/InteriorDesign/InteriorDesign";
import Warranty from "./components/warranty/Warranty";
import Guranted from "./components/Guranted/Guranted";
import Category from "./components/category/category";
import HightLights from "./components/HighLights/HighLights";
import Homeslider from "./components/HomeSlider/Homeslider";
import MainCategory from "./components/MainCategory/Category";
import * as config from "../next.config.js";
import PageHeader from "../pages/components/PageHeader";

const Homepage: React.FC = () => {
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
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResized);
    }, [handleResize, handleResized]);

    React.useEffect(() => {
        setTimeout(() => {
            handleResize();
        }, 500);
    }, [handleResize]);

    const routechanged = (e) => {
        setTimeout(() => {
            handleResize();
        }, 1000);
    }

    return (
        <div style={{ height: "100vh", overflow: "scroll", background: "#fff" }}>
            <PageHeader screenwidth={screenwidth} screenheight={screenheight} assetpath={assetpath} hidden={false} />
            <div><Homeslider screenwidth={screenwidth} screenheight={screenheight} /></div>
            <div><MainCategory /></div>
            <div><Category /></div>
            <div><HightLights /></div>
            <div><ReferNowPage /></div>
            <div><NRIFriendly /></div>
            <div><InteriorDesign /></div>
            <div><Warranty /></div>
            <div><Guranted /></div>
            <div><Footer /></div>
        </div>
    )
}

export default Homepage;