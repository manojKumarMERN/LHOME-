import React from 'react';
import css from '../styles/detailsOfimg.module.scss';
import * as config from "../next.config.js";
import { simpleCallInitAPI } from '../services/ApicallInit';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import {FaFacebookF,FaInstagram,FaTwitter,FaTelegramPlane,FaWhatsapp,FaLinkedinIn,FaYoutube} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useRouter } from 'next/router';
import { getUserId } from '../services/sessionProvider';
import { toast } from 'react-toastify';
import { AxiosService } from '../services/ApiService';

interface properties {
    data: any;
    selectedItem: any;
    index : any;
    categoryId : any;
    handleImageClick: (item: any, index: number) => void;
}


const DetailsOfimg: React.FC<properties> = ({ data, selectedItem , index , categoryId, handleImageClick }) => {

    // console.log(data);
    
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
    const [socialMediaList, setSocialMediaList] = React.useState([]);
    const [ liked , setLiked ] = React.useState(false);
    const router = useRouter();

    const handlelike = async() => {        
        try {
            if(getUserId()){
                const resp = await AxiosService.post(`/wish/${index}`, {loginId: getUserId() , categoryId })

            if(resp?.status === 200){
                const response = await AxiosService.post('/wishes', {
                    loginId: getUserId(),
                    categoryId 
                  });
                  response?.data?.wishlist.find(wish=>wish.index == index) ? setLiked(true) : setLiked(false);
                  
             }        
            }else {
                toast('please login to use');
             } 

        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        let api = simpleCallInitAPI(`${assetpath}/assets/settings.json`);
        api.then((data: any) => {
            let socialMediaIcons = [];
            data.data.settings.socialMediaIcons.forEach((datas: any) => {
                let lc: any = {};
                lc.image = `${assetpath}${datas.iconsList1}`;
                socialMediaIcons.push(lc);
            });

            setSocialMediaList(socialMediaIcons);

        })
            .catch(error => {
                console.log(error);
            });
            const fetchLikes =async () => {
                if(getUserId()){
                const response = await AxiosService.post('/wishes', {
                    loginId: getUserId(),
                    categoryId 
                  });
                  response?.data?.wishlist.find(wish=>wish.index == index) ? setLiked(true) : setLiked(false);
                }
            }
            fetchLikes()
    }, [assetpath]);

    const handleRedirect = () =>{
        if(getUserId()){
            router.push('/Bookfreedesign')
        }else{
            toast('you have to login to access this page')
        }
    }
    const [inputValue, setInputValue] = React.useState("");

    React.useEffect(() => {
        const currentURL = window.location.href;
        setInputValue(currentURL);
    }, []);
    const handleSocialMediaClick = (socialMediaURL) => {
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
                            <button className={css.wishBtn} onClick={handlelike}>
                                { (liked) ?
                                    <div className={css.wishBtn_content}><BsHeartFill style={{color:'white'}} className={css.Bs_heart} />WISHED</div> :
                                <div className={css.wishBtn_content}><BsHeart className={css.Bs_heart} />WISHLIST</div>
                                }
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

                <div>

                </div>
            </div>
        </React.Fragment>
    )

}

export default DetailsOfimg;