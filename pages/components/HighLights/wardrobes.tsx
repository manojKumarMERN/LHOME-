import React from "react";
import css from "./HighLights.module.scss";
import * as config from "../../../next.config.js";
import CustomLeftArrow from "./CustomLeftArrow";
import CustomRightArrow from "./CustomRightArrow";
import Carousel from "react-multi-carousel";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRegShareFromSquare, FaAngleRight } from 'react-icons/fa6';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import DetailsOfimg from '../../DetailsOfimg';
import { AxiosService } from "../../../services/ApiService";
import { getToken } from "../../../services/sessionProvider";
import { toast } from "react-toastify";
import Share from "../../Share";

interface propproperty {
    Citie: any;
    Currentpage: string;
}

const Wardrobes: React.FC<propproperty> = ({ Citie, Currentpage }) => {
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;

    const [wardrobefly, setWardrobeFly] = React.useState([]);
    const [likedStatus, setLikedStatus] = React.useState<{ [key: number]: boolean }>({});
    const [show, setShow] = React.useState(false);
    const [shareShow, setShareShow] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosService.get('/products/listfive');
                setWardrobeFly(response.data.productsByProductCode.strightwar);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handlePopup = (datas, index) => {
        setSelectedItem(datas);
        setSelectedIndex(index);
        setShow(true);
    };

    const handleClose = () => setShow(false);
    const handleShareShow = () => setShareShow(true);
    const handleShareClose = () => setShareShow(false);
    const handleImageClick = (item: any, index: number) => {
        setSelectedItem(item);
        setSelectedIndex(index);
    };

    const responsive = {
        desktop: { breakpoint: { max: 4000, min: 1024 }, items: 3, slidesToSlide: 1 },
        tablet: { breakpoint: { max: 1024, min: 650 }, items: 2, slidesToSlide: 1 },
        mobile: { breakpoint: { max: 650, min: 350 }, items: 1, slidesToSlide: 1 },
    };

    const handleLike = async (id: number) => {
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
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                response = await AxiosService.put(`/products/wishlist/${id}`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            if (response.status === 200) {
                setLikedStatus(prevLikedStatus => ({
                    ...prevLikedStatus,
                    [id]: !liked,
                }));
                toast(liked ? 'Product unliked successfully' : 'Product liked successfully');
            } else {
                toast('Failed to change like status. Please try again.');
            }
        } catch (error) {
            console.error('Request failed:', error);
            toast('Failed to change like status. Please try again.');
        }
    };

    const updatedWardrobe = Array.isArray(wardrobefly) ? wardrobefly.map((element) => {
        return { ...element, liked: likedStatus[element.id] || false };
    }) : [];

    return (
        <React.Fragment>
            <div className={css.wardrobesfly}>
                <div className={css.listingOuterLayer}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className={css.warddrobeflytitle}>
                            Wardrobes That Fly Off the Shelves {Citie}
                        </div>
                        {Currentpage === "/designgallery" && (
                            <Link href={{ pathname: "/wardrobe" }} className={css.seeallLink}>
                                <button className={css.compactBtn}>
                                    see all <FaAngleRight className={css.right_Arrow} />
                                </button>
                            </Link>
                        )}
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
                            dotListClass={"custom-dot-list-style"}
                            customLeftArrow={<CustomLeftArrow onClick={() => { }} />}
                            customRightArrow={<CustomRightArrow onClick={() => { }} />}
                        >
                            {updatedWardrobe.map((datas: any, index: number) => (
                                <div key={`${datas.subname}_${index}_${index}`} className={css.customdivision}>
                                    <div className={css.customdivisionchild}>
                                        <div className={css.customimage}>
                                            <img
                                                key={`${datas.subname}_${index}`}
                                                loading="lazy"
                                                src={datas.image}
                                                alt={datas.subname}
                                                onClick={() => handlePopup(datas, index)}
                                            />
                                            <div className={css.customlist}>
                                                <div className={css.customname}>
                                                    {datas.name}
                                                    <div className={css.image_bottom_icons}>
                                                        <span className={css.wishlistholder}>
                                                            <div onClick={() => handleLike(datas.id)}>
                                                                {datas?.liked ? <BsHeartFill style={{ color: '#F44336' }} /> : <BsHeart />}
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
                        <Modal show={show} onHide={handleClose} className={css.Modal_Popup}>
                            <Modal.Header>
                                <AiFillCloseCircle onClick={handleClose} />
                            </Modal.Header>
                            <DetailsOfimg data={wardrobefly} selectedItem={selectedItem} index={selectedIndex} categoryId='3' handleImageClick={handleImageClick} />
                        </Modal>
                        <Modal show={shareShow} onHide={handleShareClose} className={css.share_Modal}>
                            <Modal.Header>
                                Share<AiFillCloseCircle onClick={handleShareClose} />
                            </Modal.Header>
                            <Share />
                        </Modal>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Wardrobes;
