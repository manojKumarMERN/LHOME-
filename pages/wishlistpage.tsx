import * as React from "react";
import * as config from "../next.config";
import "react-multi-carousel/lib/styles.css";
import PageHeader from "./components/PageHeader";
import css from "../styles/wishlistpage.module.scss";
import { simpleCallInitAPI } from '../services/ApicallInit';

import { useRouter } from 'next/router';

const Wishlistpage: React.FC = () => {

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
    const [wishlistimage, setwishlistImage] = React.useState("");

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
            setwishlistImage(`${assetpath}${data.data.settings.wishlist.image}`);
           
        })
        .catch(error => {
            console.log(error);
        });
     }, [assetpath]);
    
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

    const router = useRouter();
    const { City } = router.query;

    // console.log(City);
    const page = React.useRef(null);
    const [prevPosition, setPrev] = React.useState(0);
    const [hidden, setHidden] = React.useState(false)

    const pageheaderMonitor = () => {
        if (page?.current?.scrollTop > prevPosition) {
            setPrev(page.current.scrollTop)
            setHidden(true)
        } else {
            setHidden(false)
            setPrev(page.current.scrollTop)
        }
    }

    return (
        <React.Fragment>
            <div className="animate-fade-in">
                <div className={css.lhomePage}>

                    <div className={hidden ? "hidden" : ""}>
                        <PageHeader screenwidth={screenwidth} screenheight={screenheight} assetpath={assetpath} hidden={false} />
                    </div>

                    <div className={css.wishlistInnerLayer}>
                        <div className={css.wishlistInnerContent}>
                            <div className={css.wishlistTextIcons}>
                                {wishlistimage ?
                                    <img loading="lazy" className={css.wishlisticonChanges} src={wishlistimage} alt="wishlist" />
                                    :
                                    ''
                                }
                            </div>
                            <div className={css.wishlistHeader}>No Design Found</div>
                            <div className={css.wishlistSubText}> Browse Designs</div>
                        </div>


                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}
export default Wishlistpage;