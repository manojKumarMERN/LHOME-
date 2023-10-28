import * as React from "react";
import * as config from "../next.config.js";
import PageHeader from "./components/PageHeader";
import css from "../styles/customstories.module.scss";
import Footer from "./components/Footer/Footer";
import Warranty from "./components/warranty/Warranty";
import { simpleCallInitAPI } from "../services/ApicallInit";
import JoinPool from "./components/JoinPool/joinPool";
import JoinusBanner from "./components/JoinusBanner/JoinusBanner";
import JoinusTable from "./components/JoinusTable/joinusTable";

const JoinusPage: React.FC = () => {
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
        let api = simpleCallInitAPI(`${assetpath}/assets/settings.json`);
        api.then((data: any) => {
            setLivingRoom(data.data.livingRoom);
        });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResized);
    }, [ handleResize, handleResized])
    // let imageurl :any  = "/assets/bottomcarousel/image66.jpg";


    return (
        <React.Fragment>
            <div className="animate-fade-in">
                <div className={css.lhomePage}>
                    <div>
                    </div>
                    <PageHeader screenwidth={screenwidth} screenheight={screenheight} assetpath={assetpath} hidden={true}/>
                    <div className={css.LhomeBottom}>
                        <div className={css.customstories}>
                            <div><JoinusBanner/></div>
                            <div className={css.component_1}><JoinusTable/></div>
                            <div className={css.component_2}><JoinPool /></div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default JoinusPage;