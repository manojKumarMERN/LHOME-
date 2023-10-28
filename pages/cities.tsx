import * as React from "react";
import * as config from "../next.config.js";
import PageHeader from "./components/PageHeader";
import css from "../styles/cities.module.scss";
import Footer from "./components/Footer/Footer";
import Warranty from "./components/warranty/Warranty";
import Guranted from "./components/Guranted/Guranted";
import TopPicksForKitchen from "./components/HighLights/topics";
import Wardrobes from "./components/HighLights/wardrobes";
import Link from "next/link.js";
import CitiesBanner from "./components/CitiesBanner/citiesbanner";
import Interior from "./components/Designinterior/Interior";
import HightLights from "./components/StylishHomeProducts/StylishHomeProducts";
import { useRouter } from "next/router.js";



const Cities: React.FC= () => {

    const router =useRouter()
    const {City} =router.query
    console.log(City)
    
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

    return (
        <React.Fragment>
          <div className="animate-fade-in">
                <div className={css.lhomePage}>
                    <PageHeader screenwidth={screenwidth} screenheight={screenheight} assetpath={assetpath} hidden={false} />
                    <div className={css.LhomeBottom}>
                        <div> <CitiesBanner Citie={City}  /></div>

                        <div className={css.ideabr}>

                            <div className={css.filter_home1}>
                                <span className={css.filter_link_span1}><Link href={{ pathname: "/" }} className={css.kitchen_filter_link}>home</Link></span>
                                <span className={css.filter_slash}>/</span>
                                <span className={css.filter_link_span2}><Link href={{ pathname: "/cities"}} className={css.kitchen_filter_link}>{City}</Link></span>
                            </div>
                            <p className={css.filter_header_content}>We are the best interior design<br />company in {City}  </p>
                            <div className={css.filter_content}><p className={css.filter_additional_content}>If you’re on the lookout for simple home interior designs, look no further<br />
                                than HomeLane for end- to-end interior design services.
                            </p>

                            </div>
                        </div>
                        <div className={"mb-3 " + css.ToppicsdivforDesignGallery}>
                            <TopPicksForKitchen  Citie={City} Currentpage={router.pathname}/>
                            <Wardrobes  Citie={City} Currentpage={router.pathname}/></div>
                        <p className={css.filter_header_content1}>Full-service Interior Design Service in {City} </p>
                        <div className={css.filter_content1}><p className={css.filter_additional_content1}>LHome, a leading provider of home interior designs in {City},
                            offers luxury interior design services for homeowners who want to <br />create opulent and sophisticated living spaces.
                            With a team of highly skilled and experienced interior designers in {City},<br /> HomeLane creates personalized design plans that cater to each homeowner’s unique style and preferences
                        </p>

                        </div>

                        <div> <HightLights Citie={City} /></div>
                        <div> <Interior /></div>
                        <div><Warranty /></div>
                        <div><Guranted /></div>
                        <div><Footer /></div>
                    </div>
                </div>

            </div>
            
        </React.Fragment>
    )
}
export default Cities;