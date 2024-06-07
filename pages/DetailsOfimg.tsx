import React from 'react';
import css from '../styles/detailsOfimg.module.scss';
import * as config from "../next.config.js";
import { simpleCallInitAPI } from '../services/ApicallInit';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useRouter } from 'next/router';
import { getUserId, getToken } from '../services/sessionProvider';
import { toast } from 'react-toastify';
import { AxiosService } from '../services/ApiService';

interface Properties {
    data: any;
    selectedItem: any;
    index: any;
    categoryId: any;
    handleImageClick: (item: any, index: number) => void;
}

const DetailsOfimg: React.FC<Properties> = ({ data, selectedItem, index, categoryId, handleImageClick }) => {
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
    const [socialMediaList, setSocialMediaList] = React.useState([]);
    const [likedStatus, setLikedStatus] = React.useState<{ [key: number]: boolean }>({});
    const router = useRouter();

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

    React.useEffect(() => {
        const fetchSocialMediaIcons = async () => {
            try {
                const api = await simpleCallInitAPI(`${assetpath}/assets/settings.json`);
                const socialMediaIcons = api.data.settings.socialMediaIcons.map((datas: any) => ({
                    image: `${assetpath}${datas.iconsList1}`
                }));
                setSocialMediaList(socialMediaIcons);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchWishlist = async () => {
            try {
                const token = getToken();
                if (!token) {
                    toast('Unauthorized. Please login again.');
                    return;
                }

                const response = await AxiosService.get(`/products/wishlist`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const wishlistItems = Array.isArray(response.data?.cartItems) ? response.data.cartItems : [];
                const likedStatusMap: { [key: number]: boolean } = {};
                wishlistItems.forEach(item => {
                    likedStatusMap[item.product.id] = true;
                });
                setLikedStatus(likedStatusMap);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchSocialMediaIcons();
        fetchWishlist();
    }, [assetpath, categoryId]);

    const handleRedirect = () => {
        if (getUserId()) {
            router.push('/Bookfreedesign');
        } else {
            toast('You have to login to access this page');
        }
    };

    const [inputValue, setInputValue] = React.useState("");

    React.useEffect(() => {
        const currentURL = window.location.href;
        setInputValue(currentURL);
    }, []);

    const handleSocialMediaClick = (socialMediaURL: string) => {
        window.open(socialMediaURL);
    };

    return (
        <React.Fragment>
            <div className={css.detailOff}>
                <div className={css.imageContent}>
                    <div className={css.imageOfcon}>
                        <img src={selectedItem.image} alt='description of the content' />
                    </div>
                    <div className={css.contentOfimg}>
                        <div className={css.wording}>
                            <h4 className={css.heading}>{selectedItem.name}</h4>
                            <div className={css.Type_size}>
                                <span>{selectedItem.size}</span>|<span>{selectedItem.type}</span>
                            </div>
                            <p className={css.paragraph}>{selectedItem.para}</p>
                            <div className={css.shareIcon}>
                                <span className={css.shareText}>Share this design</span>
                                <div className={css.Socailmedia_icons}>
                                    <div className={css.Social_Content_icons} onClick={() => handleSocialMediaClick(`https://www.facebook.com/share.php?u=${inputValue}`)}><FaFacebookF className={css.Social_icons} /></div>
                                    <div className={css.Social_Content_icons} onClick={() => handleSocialMediaClick(`https://www.instagram.com/?url=${inputValue}`)}><FaInstagram className={css.Social_icons} /></div>
                                    <div className={css.Social_Content_icons} onClick={() => handleSocialMediaClick(`https://twitter.com/intent/tweet?url=${inputValue}`)}><FaXTwitter className={css.Social_icons} /></div>
                                    <div className={css.Social_Content_icons} onClick={() => handleSocialMediaClick(`https://api.whatsapp.com/send?text=${inputValue}`)}><FaWhatsapp className={css.Social_icons} /></div>
                                </div>
                            </div>
                        </div>
                        <div className={css.btndivision}>
                            <button className={css.bookBtn} onClick={handleRedirect}>BOOK FREE DESIGN SESSION</button>
                            <button className={css.wishBtn} onClick={() => handleLike(selectedItem.id)}>
                                {likedStatus[selectedItem.id] ? (
                                    <div className={css.wishBtn_content}><BsHeartFill style={{ color: 'white' }} className={css.Bs_heart} />WISHED</div>
                                ) : (
                                    <div className={css.wishBtn_content}><BsHeart className={css.Bs_heart} />WISHLIST</div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Displaying related images */}
                <div className={`${css.RelatedImg} container`}>
                    <p className={`${css.headingRelated} w-100`}>Related Design</p>
                    <div className={window.innerWidth <= 1000 ? `${css.Relatedimgtag_x}` : `row ${css.Relatedimgtag}`}>
                        {data.filter(item => item !== selectedItem).map((item, i) => (
                            <div key={i} onClick={() => handleImageClick(item, i)} className={item.image ? (window.innerWidth <= 1000 ? "col-3 m-3 " : "col-6 mb-3") : "d-none"}>
                                {item.image ?
                                    <img src={item.image} alt='remaining images' className={css.img_fluid} />
                                    : ''}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DetailsOfimg;
