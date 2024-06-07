import * as React from "react";
import css from './HighLights.module.scss';
import * as config from "../../../next.config.js";
import TopPicksForKitchen from "./topics";
import Wardrobes from "./wardrobes";
import CustomLeftArrow from "./CustomLeftArrow";
import CustomRightArrow from "./CustomRightArrow";
import Carousel from "react-multi-carousel";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRegShareFromSquare } from 'react-icons/fa6';
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import DetailsOfimg from '../../DetailsOfimg';
import { AxiosService } from '../../../services/ApiService';
import { getUserId, getToken } from "../../../services/sessionProvider";
import { toast } from "react-toastify";
import Share from "../../Share";

const StylishHomeProducts: React.FC = () => {
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
    const [trendings, setTrendings] = React.useState([]);
    const [likedStatus, setLikedStatus] = React.useState<{ [key: number]: boolean }>({});
    const [show, setShow] = React.useState(false);
    const [shareShow, setShareShow] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const router = useRouter();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosService.get('/products/listfive');
                setTrendings(response.data.productsByProductCode.homeoffice);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Retrieve liked status from local storage
        const storedLikedStatus = localStorage.getItem('likedStatus');
        if (storedLikedStatus) {
            setLikedStatus(JSON.parse(storedLikedStatus));
        }

        // Check login status and fetch liked status if logged in
        const token = getToken();
        if (token) {
            fetchLikedStatus();
        } else {
            // If not logged in, set all liked statuses to false
            setLikedStatus({});
        }
    }, []);

    const fetchLikedStatus = async () => {
        try {
            const response = await AxiosService.get('/liked-status'); // Endpoint to fetch liked status
            setLikedStatus(response.data.likedStatus);
        } catch (error) {
            console.error('Error fetching liked status:', error);
            // Handle error
        }
    };

    const handlePopup = (datas, index) => {
        setSelectedItem(datas);
        setSelectedIndex(index);
        setShow(true);
    };

    const handleClose = () => setShow(false);
    const handleShareShow = () => setShareShow(true);
    const handleShareClose = () => setShareShow(false);

    const handleLike = async (id) => {
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
                const newLikedStatus = {
                    ...likedStatus,
                    [id]: !liked,
                };
                setLikedStatus(newLikedStatus);
                // Save liked status to local storage
                localStorage.setItem('likedStatus', JSON.stringify(newLikedStatus));
                toast(liked ? 'Product unliked successfully' : 'Product liked successfully');
            } else {
                toast('Failed to change like status. Please try again.');
            }
        } catch (error) {
            console.error('Request failed:', error);
            toast('Failed to change like status. Please try again.');
        }
    };

    const updatedTrendings = Array.isArray(trendings) ? trendings.map((element) => {
        return { ...element, liked: likedStatus[element.id] || false };
    }) : [];

    const responsive = {
        desktop: { breakpoint: { max: 4000, min: 1024 }, items: 3, slidesToSlide: 1 },
        tablet: { breakpoint: { max: 1024, min: 650 }, items: 2, slidesToSlide: 1 },
        mobile: { breakpoint: { max: 650, min: 350 }, items: 1, slidesToSlide: 1 },
    };

    function handleImageClick(item: any, index: number): void {
        throw new Error("Function not implemented.");
    }

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
                                dotListClass={"custom-dot-list-style"}
                                customLeftArrow={<CustomLeftArrow onClick={() => { }} />}
                                customRightArrow={<CustomRightArrow onClick={() => { }} />}
                            >
                                {updatedTrendings?.map((datas, index) => (
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
                                                                <div onClick={() => handleLike(datas
                                                                    .id)}>
                                                                    {datas.liked ? <BsHeartFill style={{ color: '#F44336' }} /> : <BsHeart />}
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
                                <DetailsOfimg data={trendings} selectedItem={selectedItem} index={selectedIndex} categoryId='1' handleImageClick={handleImageClick} />
                            </Modal>
                            <Modal show={shareShow} onHide={handleShareClose} className={css.share_Modal}>
                                <Modal.Header>
                                    Share<AiFillCloseCircle onClick={handleShareClose} />
                                </Modal.Header>
                                <Share />
                            </Modal>
                        </div>
                    </div>
                    <div><TopPicksForKitchen Citie="" Currentpage={router.pathname} /></div>
                    <div><Wardrobes Citie="" Currentpage={router.pathname} /></div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default StylishHomeProducts;
