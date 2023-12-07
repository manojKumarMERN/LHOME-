import * as React from "react";
import * as config from "../next.config.js";
import "react-multi-carousel/lib/styles.css";
import PageHeader from "./components/PageHeader";
import TopPicksForKitchen from "./components/HighLights/topics";
import Wardrobes from "./components/HighLights/wardrobes";
import css from "../styles/designgallery.module.scss";
import StylishHomeProducts from "./components/StylishHomeProducts/StylishHomeProducts";
import { useRouter } from 'next/router';
import Footer from "./components/Footer/Footer";
interface homeproperties {
    screenwidth: number;
    screenheight: number;
  
  }
const GetQuote:React.FC<homeproperties> = ({ screenwidth, screenheight })=>{
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
  
    const page =React.useRef<HTMLDivElement>(null);;

    const [prevPosition, setPrev] = React.useState(0);
    const [hidden, setHidden] = React.useState(false);
  
    const pageheaderMonitor = () => {
        if (page.current.scrollTop > prevPosition) {
            setPrev(page.current.scrollTop)
            setHidden(true)
        } else {
            setHidden(false)
            setPrev(page.current.scrollTop)
  
        }
    }
    const router = useRouter();

    return (
        <React.Fragment>
            <div className="animate-fade-in">
                <div className={css.lhomePage}>
                    
                    <div className={hidden ? "hidden" : ""}>
                        <PageHeader screenwidth={screenwidth} screenheight={screenheight} assetpath={assetpath} hidden={false} />
                    </div>

                    <div ref={page} onScroll={pageheaderMonitor} className={hidden ? css.LhomeBottom1 : css.LhomeBottom}>
                        <div className={"mb-3 " + css.ToppicsdivforDesignGallery}>
                            <TopPicksForKitchen Citie="" Currentpage={router.pathname} />
                            <Wardrobes Citie="" Currentpage={router.pathname} />
                        </div>
                        <div><StylishHomeProducts Citie="" /></div>
                        <div><Footer /></div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default GetQuote;