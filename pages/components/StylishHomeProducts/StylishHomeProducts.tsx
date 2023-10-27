
import * as React from "react";
import css from './StylishHomeProducts.module.scss';
import * as config from "../../../next.config.js";
import { simpleCallInitAPI } from '../../../services/ApicallInit';
import { useRef } from 'react';
import Carousel from "react-multi-carousel";
import CustomLeftArrow from "./CustomLeftArrow";
import CustomRightArrow from "./CustomRightArrow";
import css2 from '../HighLights/HighLights.module.scss';
import { BsHeart } from "react-icons/bs";
import { FaRegShareFromSquare } from 'react-icons/fa6';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface propproperty {
    Citie: any
}

const HightLights: React.FC<propproperty> = ({ Citie }) => {
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
    const [stylishHomeProducts, setStylishHomeProducts] = React.useState([]);
    const [wishlistimage, setWishListImage] = React.useState("");
    const [wishlistalt, setWishListAlt] = React.useState("");
    const [compactFurniture, setCompactFurniture] = React.useState([]);
    const [shareiconimage, setShareIconImage] = React.useState("");
    const [sharealt, setShareAlt] = React.useState("");
    React.useEffect(() => {
        let api = simpleCallInitAPI(`${assetpath}/assets/settings.json`);
        api.then((data: any) => {
            let lstylishHomeProducts = [];
            data.data.settings.stylishHomeProducts.forEach((datas: any) => {
                let lc: any = {};
                lc.image = `${assetpath}${datas.image}`;
                lc.name = datas.name;
                lc.subname = datas.subname;
                lc.size = datas.size
                lstylishHomeProducts.push(lc);
            });
            setStylishHomeProducts(lstylishHomeProducts);
            setWishListImage(`${assetpath}${data.data.settings.wishlistimage}`);
            setWishListAlt(`${assetpath}${data.data.settings.wishlistAlt}`);
            setShareIconImage(`${assetpath}${data.data.settings.shareiconimage}`);
            setShareAlt(`${assetpath}${data.data.settings.shareAlt}`);
            let lcompactFurniture = [];
            data.data.settings.compactFurniture.forEach((datas: any) => {
                let lc: any = {};
                lc.image = `${assetpath}${datas.image}`;
                lc.name = datas.name;
                lc.subname = datas.subname;
                lc.size = datas.size
                lcompactFurniture.push(lc);
            });
            setCompactFurniture(lcompactFurniture);
        })
            .catch(error => {
                console.log(error);
            });
    }, [assetpath]);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
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

    return (
        <React.Fragment>
            <div className={css.mainhighlights}>
                <div className={css.highlights}>
                    <div className={css2.listingOuterLayer}>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className={css.trendingtitle}>Stylish Home Products {Citie}</div>
                            <button className={css.compactBtn}>see all <FontAwesomeIcon icon={faChevronRight} /></button>
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

                                {stylishHomeProducts.map((datas: any, index: number) => (
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
                                                                <BsHeart />
                                                            </span>
                                                            <span className={css.shareholder}>
                                                                <FaRegShareFromSquare />
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
                    <div className={css.wardrobesfly}>
                        <div className={css2.listingOuterLayer}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className={css.warddrobeflytitle}>Compact Furniture {Citie}</div>
                                <button className={css.compactBtn}>see all <FontAwesomeIcon icon={faChevronRight} /></button>
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

                                    {compactFurniture.map((datas: any, index: number) => (
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
                                                                    <BsHeart />
                                                                </span>
                                                                <span className={css.shareholder}>
                                                                    <FaRegShareFromSquare />
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
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default HightLights;