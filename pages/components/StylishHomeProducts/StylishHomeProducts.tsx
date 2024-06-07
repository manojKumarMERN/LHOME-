import * as React from "react";
import css from './StylishHomeProducts.module.scss';
import * as config from "../../../next.config.js";
import Carousel from "react-multi-carousel";
import CustomLeftArrow from "./CustomLeftArrow";
import CustomRightArrow from "./CustomRightArrow";
import css2 from '../HighLights/HighLights.module.scss';
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRegShareFromSquare } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';
import Link from "next/link";
import Modal from 'react-bootstrap/Modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import DetailsOfimg from '../../DetailsOfimg';
import { AxiosService } from "../../../services/ApiService";
import { getUserId, getToken } from "../../../services/sessionProvider";
import { toast } from "react-toastify";
import Share from "../../Share";

interface propproperty {
    Citie: any
}

const HightLights: React.FC<propproperty> = ({ Citie }) => {

    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
    const [stylishHomeProducts, setStylishHomeProducts] = React.useState([]);
    const [compactFurniture, setCompactFurniture] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const [likedStatus, setLikedStatus] = React.useState<{ [key: number]: boolean }>(() => {
        const storedLikedStatus = localStorage.getItem('likedStatusStylishHomeProducts');
        return storedLikedStatus ? JSON.parse(storedLikedStatus) : {};
    });
    const [shareShow, setShareShow] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [categoryId, setCategory] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosService.get('/products/listfive');
                setCompactFurniture(response.data.productsByProductCode.spacesavingfurniture);
                setStylishHomeProducts(response.data.productsByProductCode.livingroom);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleLike = async (index: number, id: number) => {
        const auth = getToken();
        if (!auth) {
            toast('Please login to use this feature');
            return;
        }

        try {
            const token = getToken();
            if (!token) {
                toast('Unauthorized. Please login again.');
                return;
            }

            const liked = likedStatus[id] || false;
            let response;
            if (liked) {
                response = await AxiosService.delete(`/products/wishlist/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                response = await AxiosService.put(`/products/wishlist/${id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            if (response.status === 200) {
                const newLikedStatus = {
                    ...likedStatus,
                    [id]: !liked,
                };
                setLikedStatus(newLikedStatus);
                localStorage.setItem('likedStatusStylishHomeProducts', JSON.stringify(newLikedStatus));
                toast(liked ? 'Product unliked successfully' : 'Product liked successfully');
            } else {
                toast('Failed to change like status. Please try again.');
            }
        } catch (error) {
            console.error('Request failed:', error);
            toast('Failed to change like status. Please try again.');
        }
    };

    const updatedStylishHomeProducts = stylishHomeProducts.map((element, index) => ({
        ...element,
        liked: likedStatus[element.id] || false,
    }));

    const updatedCompactFurniture = compactFurniture.map((element, index) => ({
        ...element,
        liked: likedStatus[element.id] || false,
    }));

    const responsive = {
        desktop: {
            breakpoint: { max: 5000, min: 1024 },
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

    const handlePopup = (datas, index, categoryId) => {
        setSelectedItem(datas);
        setSelectedIndex(index);
        setCategory(categoryId);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleShareShow = () => {
        setShareShow(true);
    };

    const handleShareClose = () => {
        setShareShow(false);
    };

    const handleImageClick = (item: any, index: number) => {
        setSelectedItem(item);
        setSelectedIndex(index);
    };

    return (
        <React.Fragment>
            <div className={css.mainhighlights}>
                <div className={css.highlights}>
                    <div className={css2.listingOuterLayer}>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className={css.trendingtitle}>Stylish Home Products {Citie}</div>
                            <Link href={{ pathname: "/spacesavingfurniture" }} className={css.seeallLink}>
                                <button className={css.compactBtn}>
                                    see all <FaAngleRight className={css.right_Arrow} />
                                </button>
                            </Link>
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
                                dotListClass={"custom-dot-list-style "}
                                customLeftArrow={<CustomLeftArrow onClick={() => { }} />}
                                customRightArrow={<CustomRightArrow onClick={() => { }} />}
                            >
                                {updatedStylishHomeProducts.map((datas: any, index: number) => (
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
                                                    onClick={() => handlePopup(datas, index, '4')}
                                                />
                                                <div className={css.customlist}>
                                                    <div className={css.customname}>
                                                        {datas.name}
                                                        <div className={css.image_bottom_icons}>
                                                            <span className={css.wishlistholder}>
                                                                <div onClick={() => handleLike(index, datas.id)}>
                                                                    {datas.liked ? <BsHeartFill style={{ color: 'red' }} /> : <BsHeart />}
                                                                </div>
                                                                </span>
                                                            <span className={css.shareholder}>
                                                                <FaRegShareFromSquare onClick={handleShareShow} />
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
                                <Link href={{ pathname: "/spacesavingfurniture" }} className={css.seeallLink}>
                                    <button className={css.compactBtn}>
                                        see all <FaAngleRight className={css.right_Arrow} />
                                    </button>
                                </Link>
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
                                    dotListClass={"custom-dot-list-style "}
                                    customLeftArrow={<CustomLeftArrow onClick={() => { }} />}
                                    customRightArrow={<CustomRightArrow onClick={() => { }} />}
                                >
                                    {updatedCompactFurniture.map((datas: any, index: number) => (
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
                                                        onClick={() => handlePopup(datas, index, '5')}
                                                    />
                                                    <div className={css.customlist}>
                                                        <div className={css.customname}>
                                                            {datas.name}
                                                            <div className={css.image_bottom_icons}>
                                                                <span className={css.wishlistholder}>
                                                                    <div onClick={() => handleLike(index, datas.id)}>
                                                                        {datas.liked ? <BsHeartFill style={{ color: 'red' }} /> : <BsHeart />}
                                                                    </div>
                                                                </span>
                                                                <span className={css.shareholder}>
                                                                    <FaRegShareFromSquare onClick={handleShareShow} />
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
            <Modal show={show} onHide={handleClose} className={css.Modal_Popup}>
                <Modal.Header >
                    <AiFillCloseCircle onClick={handleClose} />
                </Modal.Header>
                <DetailsOfimg data={stylishHomeProducts || compactFurniture} selectedItem={selectedItem} index={selectedIndex} categoryId={categoryId} handleImageClick={handleImageClick} />
            </Modal>
            <Modal show={shareShow} onHide={handleShareClose} className={css.share_Modal}>
                <Modal.Header >
                    Share<AiFillCloseCircle onClick={handleShareClose} />
                </Modal.Header>
                <Share />
            </Modal>
        </React.Fragment>
    )
}

export default HightLights;
