import React, { useEffect } from "react";
import css from "../styles/visitus.module.scss";
import * as config from "../next.config.js";
import { simpleCallInitAPI } from "../services/ApicallInit";
import PageHeader from "./components/PageHeader";
import VisitBaner from "./components/VisitUs/visitbaner";
import Guranted from "./components/Guranted/Guranted";
import Footer from "./components/Footer/Footer";




const VisitUSMain =()=>{
    const living = React.useRef(null);
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
    }, [ handleResized,handleResize]);

    return(
        <React.Fragment>
            <div className="animate-fade-in">
                <div className={css.lhomePage}>
                <PageHeader screenwidth={screenwidth} screenheight={screenheight} assetpath={assetpath} hidden={false} />
                <div className={css.LhomeBottom}>
                    <div><VisitBaner/></div>
                    <div><Guranted/></div>
                    <div><Footer/></div>
                    
                    </div>

                </div>
                </div>
        </React.Fragment>
    )
}
export default VisitUSMain;