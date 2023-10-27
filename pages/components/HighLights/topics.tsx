import React from "react";
import css from "./HighLights.module.scss"
import { simpleCallInitAPI } from "../../../services/ApicallInit";
import * as config from "../../../next.config.js";
import Carousel from "react-multi-carousel";
import CustomLeftArrow from "./CustomLeftArrow";
import CustomRightArrow from "./CustomRightArrow";
import { BsHeart } from "react-icons/bs";
import {FaRegShareFromSquare} from 'react-icons/fa6';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface propproperty {
    Citie: any;
    Currentpage:string

}

const TopPicksForKitchen: React.FC<propproperty> = ({ Citie, Currentpage }) => {

    //assetspath 
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;

    //wishlist image 
    const [wishicon, setWishicon] = React.useState("");
    //share icon
    const [shareIcon, setSharIcon] = React.useState("");

    //data of top picks
    const [toppicks, setTopPicks] = React.useState([]);

    const responsive = {
        desktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 3,
            slidesToSlide: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 650 },
            items: 2,
            slidesToSlide: 1,
        },
        mobile: {
            breakpoint: { max: 650, min: 350 },
            items: 1,
            slidesToSlide: 1,
        },

    };

    //use effect for getting data from api
    React.useEffect(() => {
        let api = simpleCallInitAPI(`${assetpath}/assets/settings.json`);

        api
            .then((data: any) => {
                setWishicon(`${assetpath}${data.data.settings.wishlistimage}`)
                setSharIcon(`${assetpath}${data.data.settings.shareiconimage}`)


                let dataArr = [];
                data.data.settings.toppicks.forEach((datas: any) => {
                    let A: any = {};
                    A.image = datas.image;
                    A.name = datas.name;
                    A.size = datas.size;
                    dataArr.push(A);
                })
                setTopPicks(dataArr);
            }
            )
            .catch((error) => {
                console.log(error)
            })
    }, [assetpath, toppicks])

    return (
        <React.Fragment>
            <div className={css.listingOuterLayer}>
            <div className='d-flex justify-content-between  align-items-center'>
                    <div className={css.toppickstitle}>
                        Top Picks for Kitchen Designs {Citie}
                    </div>
                    {Currentpage === "/designgallery" &&(<button className={css.compactBtn}>
                        see all <FontAwesomeIcon icon={faChevronRight} />
                    </button>)}
                    </div>
                    <div className={css.carousel_design}>
                    <Carousel

                        responsive={responsive}
                        autoPlay={false}
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        infinite={true}
                        partialVisible={true}

                        dotListClass={
                            "custom-dot-list-style "
                        }
                        customLeftArrow={<CustomLeftArrow onClick={() => { }} />}
                        customRightArrow={<CustomRightArrow onClick={() => { }} />}
                    >

                        {toppicks.map((datas: any, index: number) => (
                            <div
                                key={`${datas.subname}_${index}_${index}`}
                                className={css.customdivision}
                            >
                                <div className={css.customdivisionchild}>
                                    <div className={css.customimage}>
                                        <img
                                            key={`${datas.subname}_${index}`}
                                            loading="lazy"
                                            src={datas.image}
                                            alt={datas.subname}
                                        />
                                        <div className={css.customlist}>
                                            <div className={css.customname}>
                                                {datas.name}
                                                <div className={css.image_bottom_icons}>
                                            <span className={css.wishlistholder}>
                                            <BsHeart/>
                                            </span>
                                            <span className={css.shareholder}>
                                            <FaRegShareFromSquare/>
                                            </span>
                                            </div>
                                            </div>
                                            <label className={css.customtext}>
                                                {datas.size}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                    </div>
                </div>
        </React.Fragment>
    )

}

export default TopPicksForKitchen;