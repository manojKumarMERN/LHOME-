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
import GetQuoteContent from "./components/getQuote/getQuote_content";
import { Grid } from "@mui/material";
interface homeproperties {
    screenwidth: number;
    screenheight: number;
  
  }

 const contentDatas =  [
    {
        title : 'Essential Interiors',
        subtitle : 'When it comes to choosing your BHK',
        price : '₹5.55L*',
        image: '/assets/images/getQuote/getQuote_1.png'
    },
    {
        title : 'Comfort Interiors',
        subtitle : 'For the first-time homeowners',
        price : '₹6.65L*',
        image: '/assets/images/getQuote/getQuote_2.png'
    },
    {
        title : 'Luxury Interiors',
        subtitle : 'Best of design and style',
        price : '₹7.75L*',
        image: '/assets/images/getQuote/getQuote_3.png'
    },
 ]

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
                        <div className="text-[#222222] text-[12px] sm:text-[24px] larger:text-[1.5vw] py-[1.5%] text-center leading-7 font-semibold">Below are your estimates to book a free consultation</div>
                        <Grid container justifyContent={"center"} paddingY={2} paddingX={10} gap={10}  >
                        {
                            contentDatas.map((data , index)=>(
                                <Grid item lg={3} md={3.8} sm={12} key={index}>
                                    <GetQuoteContent data={data} />
                                    </Grid>
                                    ))
                                }
                                </Grid>
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