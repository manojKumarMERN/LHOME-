import * as React from "react";
import css from './HighLights.module.scss';
import * as config from "../../../next.config.js";
import { simpleCallInitAPI } from '../../../services/ApicallInit';
import TopPicksForKitchen from "./topics";
import Wardrobes from "./wardrobes";
import CustomLeftArrow from "./CustomLeftArrow";
import CustomRightArrow from "./CustomRightArrow";
import Carousel from "react-multi-carousel";
import { BsHeart } from "react-icons/bs";
import { BsHeartPulseFill } from "react-icons/bs";
import { FaRegShareFromSquare } from 'react-icons/fa6'
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal'
import { AiFillCloseCircle } from 'react-icons/ai';
import DetailsOfimg from '../../DetailsOfimg';
import { AxiosService } from '../../../services/ApiService'

const StylishHomeProducts: React.FC = () => {
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
    const [trendings, setTrendings] = React.useState([]);
    const [wishlistimage, setWishListImage] = React.useState("");
    const [wishlistalt, setWishListAlt] = React.useState("");

    const [shareiconimage, setShareIconImage] = React.useState("");
    const [sharealt, setShareAlt] = React.useState("");
    React.useEffect(() => {
        let api = simpleCallInitAPI(`${assetpath}/assets/settings.json`);
        api.then((data: any) => {
            let ltrendings = [];
            // data.data.settings.trendings.forEach((datas: any) => {
            //     let lc: any = {};
            //     lc.image = `${assetpath}${datas.image}`;
            //     lc.name = datas.name;
            //     lc.subname = datas.subname;
            //     lc.size = datas.size
            //     ltrendings.push(lc);
            // });
            // setTrendings(ltrendings);
            setWishListImage(`${assetpath}${data.data.settings.wishlistimage}`);
            setWishListAlt(`${assetpath}${data.data.settings.wishlistAlt}`);
            setShareIconImage(`${assetpath}${data.data.settings.shareiconimage}`);
            setShareAlt(`${assetpath}${data.data.settings.shareAlt}`);
        })
            .catch(error => {
                console.log(error);
            });
    }, [assetpath]);

    

    const [show, setShow] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);


    const handlePopup = (datas) => {
        setSelectedItem(datas);
        setShow(true);
    };


    const handleClose = () => {
        setShow(false);
    }


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
    const router = useRouter();

    const handlelike = async(id ,user_id = "3") => {
        try {

            const res = await AxiosService.put(`/category/${user_id}`, {Category_id : id})

            if(res?.status === 200){
                categoryCall()
            }

        console.log("update================>>>>",res)
        } catch (error) {
            console.log(error)
        }
    }

    const categoryCall = async() => {
        let res = await AxiosService.get('/category/modular')
        if(res?.data?.statusCode === 200){
            setTrendings(res?.data?.data);
            console.log("categoryCall--------->>>>",res?.data?.data)
        }
    }

    React.useEffect(()=>{
        categoryCall()
    },[assetpath])

    console.log("assetpath-------->>>",assetpath)

    return (
        <React.Fragment>
            <div className={css.mainhighlights}>
                <div className={css.highlights}>

                    <div className={css.listingOuterLayer}>
                        <div className={css.trendingtitle}>Trending</div>
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

                                {trendings?.map((datas: any, index: number) => (
                                    <div
                                        key={`${datas.subname}_${index}_${index}`}
                                        className={css.customdivision}
                                        onClick={() => handlePopup(datas)}
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
                                                            <div onClick={()=> handlelike(datas?.id)}>
                                                            {
                                                                    datas?.likes?.includes(3) ? <BsHeartPulseFill /> : <BsHeart /> 
                                                            }
                                                        </div>
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
                            <Modal show={show} onHide={handleClose} className={css.Modal_Popup}>
                                <Modal.Header >
                                    <AiFillCloseCircle onClick={handleClose} />
                                </Modal.Header>
                                <DetailsOfimg data={trendings} selectedItem={selectedItem} />
                            </Modal>
                        </div>
                    </div>

                    <div><TopPicksForKitchen Citie="" Currentpage={router.pathname} /></div>
                    <div><Wardrobes Citie="" Currentpage={router.pathname} /></div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default StylishHomeProducts;