
import { useRouter } from 'next/router';
import * as React from "react";
import css from '../../styles/HomePage.module.scss';
import * as Router from "react-router-dom";
import PageHeader from "./PageHeader";
import { simpleCallInitAPI } from '../../services/ApicallInit';
import * as config from "../../next.config.js";
import ImageSlider from './ImageSlider';
import CircleArrow from "../../public/assets/SVGIcons/CircleArrow";
import rajapalayam from "../../public/assets/guranted/rajapalayam.png";
import coimbatore from "../../public/assets/guranted/coimbatore.jpg";
import Image from "next/image"
import css1 from '../../styles/PageHeader.module.scss';
import { useRef } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface homeproperties {
   screenwidth: number;
   screenheight: number;
}

const responsive = {
   desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1
   },
   tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 1
   },
   mobile: {
      breakpoint: { max: 767, min: 601 },
      items: 2,
      slidesToSlide: 1
   },
   mini: {
      breakpoint: { max: 600, min: 200 },
      items: 1,
      slidesToSlide: 1
   }
};

const sliderImageUrl = [
   {
      url:
         "/assets/bottomcarousel/Maskgroup.svg"
   },
   {
      url:
         "/assets/bottomcarousel/Maskgroup.svg"
   },
   {
      url:
         "/assets/bottomcarousel/Maskgroup.svg"
   },
   {
      url:
         "/assets/bottomcarousel/Maskgroup.svg"
   },
   {
      url:
         "/assets/bottomcarousel/Maskgroup.svg"
   },
   {
      url:
         "/assets/bottomcarousel/Maskgroup.svg"
   },
   {
      url:
         "/assets/bottomcarousel/Maskgroup.svg"
   }
];
const whieIcons = [
   {
      url:
         "/assets/icons/warranty.png"
   },
   {
      url:
         "/assets/icons/Calendar.png"
   },
   {
      url:
         "/assets/icons/designexperts.png"
   },
   {
      url:
         "/assets/icons/cd.png"
   },
];
const HomePage: React.FC<homeproperties> = ({ screenwidth, screenheight }) => {
   const navigate = Router.useNavigate();
   const [height, setHeight] = React.useState(screenheight);
   const [width, setWidth] = React.useState(screenwidth);
   let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
   const sliderref = React.useRef(null);
   const knowabout = React.useRef(null);
   const knowaboutsubholder = React.useRef(null);
   const sliderwrap = React.useRef(null);
   const division1 = React.useRef(null);
   const division2 = React.useRef(null);
   const listingcategory = React.useRef(null);
   const highlights = React.useRef(null);
   const living = React.useRef(null);
   const nrifriendly = React.useRef(null);
   const reference = React.useRef(null);
   const warranty = React.useRef(null);
   const guaranteed = React.useRef(null);
   const footer = React.useRef(null);
   const interiorDesign = React.useRef(null);
   const [swidth, setSWidth] = React.useState(0);
   const [sheight, setSHeight] = React.useState(0);
   const [calenderimage, setCalendarImage] = React.useState("");
   const [calimage, setCalImage] = React.useState("");//create new state
   const [designimage, setDesignImage] = React.useState("") //create new state
   const [desimage, setDesImage] = React.useState(""); //create new state
   const [happyhomeimage, setHappyHomeImage] = React.useState("");
   const [expertimage, setExpertImage] = React.useState("");
   const [warrantyimage, setWarrantyImage] = React.useState("");
   const [warrentyimage, setWarrentyImage] = React.useState("");//create new state
   const [deliveryimage, setDeliveryImage] = React.useState("");
   const [priceimage, setPriceImage] = React.useState("");
   const [superiorimage, setSuperiorImage] = React.useState("");
   const [safetyimage, setSafetyImage] = React.useState("");
   const [referboyimage, setReferBoyImage] = React.useState("");
   const [referboyalt, setReferBoyAlt] = React.useState("");
   const [wishlistimage, setWishListImage] = React.useState("");
   const [wishlistalt, setWishListAlt] = React.useState("");
   const [shareiconimage, setShareIconImage] = React.useState("");
   const [sharealt, setShareAlt] = React.useState("");
   const [listingCategories, setListingCategories] = React.useState([]);
   const [socialMediaList, setSocialMediaList] = React.useState([]);
   const [trendings, setTrendings] = React.useState([]);
   const [toppicks, setTopPicks] = React.useState([]);
   const [wardrobefly, setWordrobeFly] = React.useState([]);
   const [mobile, setMobile] = React.useState("");
   const [location, setLocation] = React.useState("");
   const [mail, setMail] = React.useState("");
   const [coimbatore, setCoimbatore] = React.useState("");
   const [rajapalayam, setRajapalayam] = React.useState("");
   const [googleIcon, setGoogleIcon] = React.useState("");
   const [nrifriendlyicon, setNrifriendlyicon] = React.useState("");
   const [interiorListTopText, setInteriorListTopText] = React.useState([]);
   const [interiorListBottomText, setInteriorListBottomText] = React.useState([]);
   const Cclass: string = "peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
   React.useEffect(() => {
      setTimeout(() => {
         setSWidth(sliderref.current.offsetWidth);
         setSHeight(sliderref.current.offsetHeight);
         if (sliderwrap.current.offsetWidth < 600) {
            let topposition = sliderwrap.current.offsetHeight;
            knowabout.current.style.top = `${topposition - 180}px`;
         } else {
            let topposition = sliderwrap.current.offsetHeight;
            knowabout.current.style.top = `0px`;
            knowabout.current.style.position = "relative";
         }
         let divwidth1 = division1.current.offsetWidth;
         let addvalue = 0;
         if (screenwidth < 770) {
            addvalue += 15;
         }
         division1.current.querySelector("#verticaldivider").style.left = `${division1.current.offsetLeft + divwidth1 - 20 + addvalue}px`;
         division1.current.querySelector("#verticaldivider").style.marginTop = "50px";
         division1.current.querySelector("#verticaldivider").style.position = "absolute";
         let divwidth2 = division1.current.offsetWidth;
         division2.current.querySelector("#verticaldivider").style.left = `${division2.current.offsetLeft + divwidth2 + 20}px`;
         division2.current.querySelector("#verticaldivider").style.marginTop = "0px";
         division1.current.querySelector("#verticaldivider").style.position = "absolute";
         let theight = knowaboutsubholder.current.querySelector("#division3").querySelector("#detailsholder").offsetTop + knowaboutsubholder.current.querySelector("#division3").querySelector("#detailsholder").offsetHeight;
         listingcategory.current.style.top = `${theight + 50}px`;
         highlights.current.style.top = `${listingcategory.current.offsetTop + listingcategory.current.offsetHeight + 50}px`;
         reference.current.style.top = `${highlights.current.offsetTop + highlights.current.offsetHeight + 40}px`;
         living.current.style.top = `${reference.current.offsetTop + reference.current.offsetHeight + 100}px`;
         nrifriendly.current.style.top = `${living.current.offsetTop + living.current.offsetHeight + 20}px`;
         interiorDesign.current.style.top = `${nrifriendly.current.offsetTop + nrifriendly.current.offsetHeight + 20}px`;
         warranty.current.style.top = `${interiorDesign.current.offsetTop + interiorDesign.current.offsetHeight + 100}px`;
         guaranteed.current.style.top = `${warranty.current.offsetTop + warranty.current.offsetHeight + 20}px`;
         footer.current.style.top = `${guaranteed.current.offsetTop + guaranteed.current.offsetHeight + 20}px`;
      }, 1500)
   }, [screenwidth]);

   React.useEffect(() => {
      let api = simpleCallInitAPI(`${assetpath}/assets/settings.json`);
      api.then((data: any) => {
         setCalendarImage(`${assetpath}${data.data.settings.infoicons.calendarimage}`);
         setCalImage(`${assetpath}${data.data.settings.infoicons.whitecalendarimage}`);//set new state
         setHappyHomeImage(`${assetpath}${data.data.settings.infoicons.happyhomeimage}`);
         setDesignImage(`${assetpath}${data.data.settings.infoicons.whiteexpertimage}`); //set new state
         setDesImage(`${assetpath}${data.data.settings.infoicons.caresupport}`); //set new state
         setExpertImage(`${assetpath}${data.data.settings.infoicons.expertimage}`)//set new state
         setWarrentyImage(`${assetpath}${data.data.settings.infoicons.warrantyimage}`)
         setWarrantyImage(`${assetpath}${data.data.settings.infoicons.whitewarrantyimage}`)
         setDeliveryImage(`${assetpath}${data.data.settings.infoicons.deliveryimage}`)
         setPriceImage(`${assetpath}${data.data.settings.infoicons.priceimage}`)
         setSuperiorImage(`${assetpath}${data.data.settings.infoicons.maskgroupimage}`)
         setSafetyImage(`${assetpath}${data.data.settings.infoicons.safetyimage}`)
         setReferBoyImage(`${assetpath}${data.data.settings.referboyimage}`);
         setReferBoyAlt(`${assetpath}${data.data.settings.referboyalt}`);
         setWishListImage(`${assetpath}${data.data.settings.wishlistimage}`);
         setWishListAlt(`${assetpath}${data.data.settings.wishlistAlt}`);
         setShareIconImage(`${assetpath}${data.data.settings.shareiconimage}`);
         setShareAlt(`${assetpath}${data.data.settings.shareAlt}`);
         setNrifriendlyicon(`${assetpath}${data.data.settings.nrifriendlyicon}`)
         let lcategories = [];
         data.data.settings.categories.forEach((cats: any) => {
            let lc: any = {};
            lc.image = `${assetpath}${cats.image}`;
            lc.text = cats.text;
            lc.category = cats.category;
            lcategories.push(lc);
         });
         setListingCategories(lcategories);
         let ltrendings = [];
         data.data.settings.trendings.forEach((datas: any) => {
            let lc: any = {};
            lc.image = `${assetpath}${datas.image}`;
            lc.name = datas.name;
            lc.subname = datas.subname;
            lc.size = datas.size
            ltrendings.push(lc);
         });
         setTrendings(ltrendings);
         let ltoppicks = [];
         data.data.settings.toppicks.forEach((datas: any) => {
            let lc: any = {};
            lc.image = `${assetpath}${datas.image}`;
            lc.name = datas.name;
            lc.subname = datas.subname;
            lc.size = datas.size
            ltoppicks.push(lc);
         });
         setTopPicks(ltoppicks)
         let lwardrobefly = [];
         data.data.settings.warddrobefly.forEach((datas: any) => {
            let lc: any = {};
            lc.image = `${assetpath}${datas.image}`;
            lc.name = datas.name;
            lc.subname = datas.subname;
            lc.size = datas.size
            lwardrobefly.push(lc);
         });
         let socialMediaIcons = [];
         data.data.settings.socialMediaIcons.forEach((datas: any) => {
            let lc: any = {};
            lc.image = `${assetpath}${datas.iconsList1}`;
            socialMediaIcons.push(lc);
         });
         setSocialMediaList(socialMediaIcons);
         setWordrobeFly(lwardrobefly);
         setMobile(`${assetpath}${data.data.settings.mobile}`);
         setLocation(`${assetpath}${data.data.settings.location}`);
         setMail(`${assetpath}${data.data.settings.mail}`);
         setRajapalayam(`${assetpath}${data.data.settings.rajapalayam}`);
         setCoimbatore(`${assetpath}${data.data.settings.coimbatore}`)
         setGoogleIcon(`${assetpath}${data.data.settings.google}`);
         let linteriorTopTexts = [];
         data.data.settings.interior.forEach((cats: any) => {
            let lc: any = {};
            lc.topimage = `${assetpath}${cats.image}`;
            lc.toptext = cats.toptext;
            linteriorTopTexts.push(lc);
         });
         setInteriorListTopText(linteriorTopTexts);
         let linteriorBottomTexts = [];
         data.data.settings.interiorBottom.forEach((cats: any) => {
            let lc: any = {};
            lc.bottomimage = `${assetpath}${cats.image}`;
            lc.bottomtext = cats.bottomtext;
            linteriorBottomTexts.push(lc);
         });
         setInteriorListBottomText(linteriorBottomTexts);
      })
         .catch(error => {
            console.log(error);
         });
   }, [screenwidth, swidth, sheight,assetpath]);

   /*image horizontal scroll */

   /* FOR CAROUSEL LEFT AND RIGHT MOVEMENT */
   const trendingScrollRef = useRef(null);
   const topScrollRef = useRef(null);
   const wardropeScrollRef = useRef(null);


   const handleLeftClick = (ref) => {
      const scrollElem = ref.current;
      if (scrollElem) {
         scrollElem.scrollBy({ left: -250, top: 0, behavior: "smooth" });
      }
   };

   const handleRightClick = (ref) => {
      const scrollElem = ref.current;
      if (scrollElem) {
         scrollElem.scrollBy({ left: 250, top: 0, behavior: "smooth" });
      }
   };

   return (
      <React.Fragment>
         <div className="animate-fade-in">
            <div className={css.lhomePage}>
               <PageHeader screenwidth={screenwidth} screenheight={screenheight} assetpath={assetpath} hidden={false} />
               <div className={css.LhomeBottom}>
                  <div ref={sliderwrap} className={css.sliderwrapper}>
                     <div id="slider" ref={sliderref} className={css.slider}>
                        {swidth > 0 ?
                           <ImageSlider screenwidth={screenwidth} screenheight={screenheight} swidth={swidth} sheight={sheight} />
                           : ''}
                     </div>
                     <div className={css.sliderwrapperinputs}>
                        <div className={css.sliderwrappertextholder}>
                           {screenwidth > 650 ?
                              <div className={css.taglineholder}>
                                 <div className={css.tagline1}>Lhome Make your home better</div>
                              </div>
                              :
                              <div className={css.tagline1}>Lhome Make
                                 your home
                                 better</div>
                           }
                        </div>
                        <div className={css.estimatebuttonholder}>
                           <button className={css.estimatebutton}>
                              <label className={css.estimatetext}>
                                 Get Free Estimate
                              </label>
                           </button>
                        </div>
                        <div className={css.designermeetholder}>
                           <div className={css.designermeet}>
                              <div className={css.designermeettitle}>
                                 Meet a designer
                              </div>
                              {/* font family and size chananged all input tags & placeholder font and color changed*/}

                              <div id="formentry" className={`flex  gap-6 ${css.inputbox}`} style={{ paddingTop: "2%" }}>
                                 <div style={{ marginTop: "-20px" }} className={`relative h-11 w-full min-w-[200px] ${css.marginmove_5}`}>
                                    <input
                                       placeholder="Enter your name"
                                       className="peer h-full w-full border-b placeholder-gray-700 placeholder-opacity-40 bg-transparent pt-4 pb-1.5 font-Montserrat text-16px font-normal   outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    />
                                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    </label>
                                 </div>
                                 <div className={`relative h-11 w-full min-w-[200px] ${css.marginmove_2}`}>
                                    <input
                                       placeholder="Enter your email"
                                       className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-Montserrat text-16px font-normal placeholder-gray-700 placeholder-opacity-40 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    />
                                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    </label>
                                 </div>
                              </div>
                              <div className="flex  gap-6" style={{ width: "100%",marginTop:"2%" }}>
                                 <div className={`relative h-11 w-full min-w-[200px] ${css.marginmovebig_2}`}>
                                    <input
                                       placeholder="Enter your mobile number"
                                       className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-Montserrat text-16px font-normal placeholder-gray-700 placeholder-opacity-40  outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    />
                                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    </label>
                                 </div>
                              </div>
                              <div className={css.whatsappdetailsholder}>
                                 <label className={css.whatsapplabel}>
                                    <div className={css.label1}>you can reach me on whatsApp</div>
                                    <div className={css.label2}>opt for meeting and offer updates on WhatsApp</div>
                                    <label className={`inline-flex items-center ${css.whatsappcheckbox}`}>
                                       <input type="checkbox" className="form-checkbox h-6 w-6 text-blue-600" />
                                    </label>
                                 </label>
                              </div>
                              <div className="flex  gap-6" style={{ width: "100%", marginTop: "-5px" }}>
                                 <div className={`relative h-11 w-full min-w-[200px] ${css.marginmovebig_2}`}>
                                    <input
                                       placeholder="Enter your current residence pincode"
                                       className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-Montserrat text-16pxfont-normal placeholder-gray-700 placeholder-opacity-40 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    />
                                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    </label>
                                 </div>
                              </div>
                              <div className={css.designerbookingconfirmationholder} style={{ marginTop: "10px" }}>
                                 <button className={css.designerbookingconfirmationbutton}><label>BOOK FREE DESIGN SESSION</label></button>
                              </div>
                              <div className={css.designerbookingwarningtext}>By submitting this form, you agree to the privacy policy and terms of use</div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div ref={knowabout} className={css.whythesedetailsholder}>
                     <div ref={knowaboutsubholder} className={css.whythesedetailssubholder}>
                        {/* start icon images was changed */}
                        <div ref={division1} className={css.division1}>
                           <div className={css.title}>
                              Why Lhome?
                           </div>
                           <div className={css.detailsholder}>
                              <hr id="verticaldivider" className={css.verticaldivider} />
                              <div className={`${css.leftdetailsholder} ${css.leftmoveup}`}>
                                 <div className={css.calendardetailsparent}>
                                    <div className={css.calendaricon}>
                                       {calenderimage ?
                                          <img loading="lazy" src={calimage} alt="Calendar" />
                                          :
                                          ''
                                       }
                                    </div>
                                    <div className={css.calendartext}>
                                       45 days or we pay you rent
                                    </div>
                                 </div>
                                 <div className={css.expertdetailsparent}>
                                    <div className={css.experticon}>
                                       {expertimage ?
                                          <img loading="lazy" src={desimage} alt="Happy Home" />
                                          :
                                          ''
                                       }
                                    </div>
                                    <div className={css.experttext}>
                                       1000+ design experts
                                    </div>
                                 </div>
                              </div>
                              <div className={css.rightdetailsholder}>
                                 <div className={css.happycustomerhomedetailsparent}>
                                    <div className={css.happycustomerhomeicon}>
                                       {happyhomeimage ?
                                          <img loading="lazy" src={happyhomeimage} alt="Expert" />
                                          :
                                          ''
                                       }
                                    </div>
                                    <div className={css.happycustomerhometext}>
                                       1000+ happy customers
                                    </div>
                                 </div>
                                 <div className={css.warrantydetailsparent}>
                                    <div className={css.warrantyicon}>
                                       {warrantyimage ?
                                          <img loading="lazy" src={warrentyimage} alt="Warranty" />
                                          :
                                          ''
                                       }
                                    </div>
                                    <div className={css.warrantytext}>
                                       flat 10 year warranty
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {/* finished icon images was changed */}
                        <div ref={division2} className={css.division2}>
                           {screenwidth < 770 ?
                              <div className={css.title1}>
                                 Ensure your safety by embracing virtual design methods
                              </div>
                              :
                              <div>
                                 <div className={css.title1}>
                                    Ensure your safety by embracing
                                 </div>
                                 <div className={css.title1}>
                                    virtual design methods
                                 </div>
                              </div>
                           }
                           <div className={css.detailsholder}>
                              <hr id="verticaldivider" className={css.verticaldivider} />
                              <div className={`${css.leftdetailsholder} ${css.leftmovedown}`}>
                                 <div className={css.contactparent}>
                                    <div className={css.contacttitle}>
                                       Contactless Experience
                                    </div>
                                    <div className={css.contacttext}>
                                       No stepping out. Design your home interiors from the safety and comfort of your home.
                                    </div>
                                 </div>
                                 <div className={css.expertiseparent}>
                                    <div className={css.expertisetitle}>
                                       Online Expertise
                                    </div>
                                    <div className={css.expertisetext}>
                                       Connect with our 600+ designers virtually and explore designs online.
                                    </div>
                                 </div>
                              </div>
                              <div className={`${css.rightdetailsholder} ${css.rightmoveup}`}>
                                 <div className={css.threedparent}>
                                    <div className={css.threedtitle}>
                                       Live 3D Designs
                                    </div>
                                    <div className={css.threedtext}>
                                       Explore life-like 3D designs online that are made for your floor plan.
                                    </div>
                                 </div>
                                 <div className={css.instantparent}>
                                    <div className={css.instanttitle}>
                                       Instant Pricing
                                    </div>
                                    <div className={css.instanttext}>
                                       Enjoy complete price transparency and stay within budget.
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div id="division3" className={css.division3}>
                           <div className={css.title}>
                              LHOME GUARANTEE
                           </div>
                           <div id="detailsholder" className={css.detailsholder}>
                              <div className={`${css.leftdetailsholder} ${css.leftmovedown}`}>
                                 <div className={css.deliveryparent}>
                                    <div className={css.deliveryicon}>
                                       {deliveryimage ?
                                          <img loading="lazy" src={deliveryimage} alt="Delivery" />
                                          :
                                          ''
                                       }
                                    </div>
                                    <div className={css.deliverytext}>
                                       On-time delivery
                                    </div>
                                 </div>
                                 <div className={css.priceparent}>
                                    <div className={css.priceicon}>
                                       {priceimage ?
                                          <img loading="lazy" src={priceimage} alt="Expert" />
                                          :
                                          ''
                                       }
                                    </div>
                                    <div className={css.pricetext}>
                                       Best Price
                                    </div>
                                 </div>
                              </div>
                              <div className={`${css.rightdetailsholder} ${css.rightmoveup}`}>
                                 <div className={css.superiorparent}>
                                    <div className={css.superiorparent}>
                                       <div className={css.superioricon}>
                                          {superiorimage ?
                                             <img loading="lazy" src={superiorimage} alt="Superior Quality" />
                                             :
                                             ''
                                          }
                                       </div>
                                       <div className={css.superiortext}>
                                          Superior Quality
                                       </div>
                                    </div>
                                 </div>
                                 <div className={css.safetyparent}>
                                    <div className={css.safetyparent}>
                                       <div className={css.safetyicon}>
                                          {safetyimage ?
                                             <img loading="lazy" src={safetyimage} alt="Safety Assured" />
                                             :
                                             ''
                                          }
                                       </div>
                                       <div className={css.safetytext}>
                                          Safety Assured
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div ref={listingcategory} className={css.listingcategory}>
                        <div className={css.listingcategoryOuterLayer}>
                           <div className={css.categorytitle}>Listing category<span><CircleArrow scale={".5"} /></span></div>
                           <div className={css.listingfilmrole}>
                              {
                                 listingCategories.map((cats: any, index: number) =>
                                    <div key={`${cats.category}_${index}_${index}`} className={css.division}>
                                       <div className={css.divisionchild}>
                                          <div className={css.categoryimage}>
                                             <img key={`${cats.category}_${index}`} loading="lazy" src={cats.image} alt={cats.category} />
                                          </div>
                                          <div className={css.category}>
                                             <label className={css.categoryname}>{cats.category}</label>
                                             <label className={css.categorytext}>{cats.text}</label>
                                          </div>
                                       </div>
                                    </div>
                                 )
                              }
                           </div>
                        </div>
                     </div>
                     <div ref={highlights} className={css.highlights}>
                        <div className={css.trendingoffice}>
                           <div className={css.trendingtitle}>Trending</div>
                           <div className='container-fluid d-flex' style={{ overflowY: "hidden", overflowX: "hidden", scrollBehavior: "smooth" }}>
                              <button className="scroll-btn left" onClick={() => handleLeftClick(trendingScrollRef)}>&#10094;</button>
                              <div className={css.trendingfilmrole} ref={trendingScrollRef} style={{ overflowY: "hidden", overflowX: "hidden", boxSizing: "content-box" }} >
                                 {
                                    trendings.map((datas: any, index: number) =>
                                       <div key={`${datas.subname}_${index}_${index}`} className={css.customdivision}>
                                          <div className={css.customdivisionchild}>
                                             <div className={css.customimage}>
                                                <img key={`${datas.subname}_${index}`} loading="lazy" src={datas.image} alt={datas.subname} />
                                                <div className={css.customlist}>
                                                   <div className={css.customname}>{datas.name}<span className={css.wishlistholder}><img loading="lazy" className={css.wishlist} src={wishlistimage} alt={wishlistalt} /></span><span className={css.shareholder}><img loading="lazy" className={css.share} src={shareiconimage} alt={sharealt} /></span></div>
                                                   <label className={css.customtext}>{datas.size}</label>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    )
                                 }
                              </div>
                              <button className="scroll-btn right" onClick={() => handleRightClick(trendingScrollRef)}>&#10095;</button>
                           </div>
                        </div>
                        <div className={css.toppickskitchen}>
                           <div className={css.listingOuterLayer}>
                              <div className={css.toppickstitle}>Top Picks for Kitchen Designs</div>
                              <div className='container-fluid d-flex' style={{ overflowY: "hidden", overflowX: "hidden", scrollBehavior: "smooth" }}>
                                 <button className="scroll-btn left" onClick={() => handleLeftClick(topScrollRef)}>&#10094;</button>

                                 <div className={css.toppicksfilmrole} ref={topScrollRef} style={{ overflowX: "hidden", overflowY: "hidden", boxSizing: "content-box" }}>
                                    {
                                       toppicks.map((datas: any, index: number) =>
                                          <div key={`${datas.subname}_${index}_${index}`} className={css.customdivision}>
                                             <div className={css.customdivisionchild}>
                                                <div className={css.customimage}>
                                                   <img key={`${datas.subname}_${index}`} loading="lazy" src={datas.image} alt={datas.subname} />
                                                   <div className={css.customlist}>
                                                      <div className={css.customname}>{datas.name}<span className={css.wishlistholder}><img loading="lazy" className={css.wishlist} src={wishlistimage} alt={wishlistalt} /></span><span className={css.shareholder}><img loading="lazy" className={css.share} src={shareiconimage} alt={sharealt} /></span></div>
                                                      <label className={css.customtext}>{datas.size}</label>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       )
                                    }
                                 </div>
                                 <button className="scroll-btn right" onClick={() => handleRightClick(topScrollRef)}>&#10095;</button>
                              </div>
                           </div>
                        </div>
                        <div className={css.wardrobesfly}>
                           <div className={css.listingOuterLayer}>
                              <div className={css.warddrobeflytitle}>Wardrobes That Fly Off the Shelves</div>
                              <div className='container-fluid d-flex' style={{ overflowX: "hidden", overflowY: "hidden", scrollBehavior: "smooth" }}>
                                 <button className="scroll-btn left" onClick={() => handleLeftClick(wardropeScrollRef)}>&#10094;</button>

                                 <div className={css.wardrobeflyfilmrole} ref={wardropeScrollRef} style={{ overflowX: "hidden", overflowY: "hidden", boxSizing: "content-box" }}>
                                    {
                                       wardrobefly.map((datas: any, index: number) =>
                                          <div key={`${datas.subname}_${index}_${index}`} className={css.customdivision}>
                                             <div className={css.customdivisionchild}>
                                                <div className={css.customimage}>
                                                   <img key={`${datas.subname}_${index}`} loading="lazy" src={datas.image} alt={datas.subname} />
                                                   <div className={css.customlist}>
                                                      <div className={css.customname}>{datas.name}<span className={css.wishlistholder}><img loading="lazy" className={css.wishlist} src={wishlistimage} alt={wishlistalt} /></span><span className={css.shareholder}><img loading="lazy" className={css.share} src={shareiconimage} alt={sharealt} /></span></div>
                                                      <label className={css.customtext}>{datas.size}</label>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       )
                                    }
                                 </div>
                                 <button className="scroll-btn right" onClick={() => handleRightClick(wardropeScrollRef)}>&#10095;</button>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div ref={reference} className={css.referholder}>
                        <div className={css.refer}>
                           <div className={css.rdivision1}>

                           </div>
                           <div className={css.rdivision2}>
                              <div className={css.imageHolder}>
                                 <img loading="lazy" src={referboyimage} className={css.referman} alt={referboyalt} />
                                 <div className={css.referdetailsholder}>
                                    <div className={css.referdetailslist}>
                                       <div className={css.refermanmaintext}>
                                          Love our service? Recommend us!
                                       </div>
                                       <div className={css.refermansubtext}>
                                          Earn ₹ 10,000 for every friend who tries LHome.
                                       </div>
                                       <div className={css.refermanbuttonholder}>
                                          <button className={css.refernewbutton}>Refer Now</button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className={css.rdivision3}>

                           </div>
                        </div>
                     </div>
                     <div ref={living} className={css.living}>
                        <div className={css.toppickstitle}>Contented Living with Lhome</div>
                        <div className="bottomcarousel">
                           <Carousel
                              responsive={responsive}
                              autoPlay={true}
                              swipeable={true}
                              draggable={true}
                              showDots={false}
                              infinite={true}
                              partialVisible={false}
                              dotListClass="custom-dot-list-style"
                           >
                              {sliderImageUrl.map((imageUrl, index) => {
                                 return (
                                    <div className="slider p-3 highlightImage" key={index}>
                                       <img src={imageUrl.url} alt="lhome" />
                                    </div>
                                 );
                              })}
                           </Carousel>
                        </div>
                     </div>
                     <div ref={nrifriendly} className={css.nrifriendly}>
                        <div className={css.nrifriendlytoo}>
                           <div className={css.rdivision1}>

                           </div>
                           <div className={css.rdivision2}>
                              <div className={css.imageHolder}>
                                 <img loading="lazy" src={nrifriendlyicon} className={css.referman} alt={referboyalt} />
                                 <div className={css.referdetailsholder}>
                                    <div className={css.referdetailslist}>
                                       <div className={css.refermanmaintext}>
                                          We are NRI-friendly too.
                                       </div>
                                       <div className={css.refermansubtext}>
                                          Bringing Your Vision to Life, Worldwide NRI-friendly Home Solutions
                                       </div>
                                       <div className={css.refernributtonholder}>
                                          <button className={css.refernewbutton}>Read more</button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className={css.rdivision3}>

                           </div>
                        </div>

                     </div>
                     <div ref={interiorDesign} className={css.interiorDesign}>
                        <div className={css.interiorDesignOuter}>
                           <div className={css.guaranteedHeader}>Full-service Interior Design</div>
                           <div className={`${css.interiorDesignTop} ${css.interiorDesignTopOuter}`} >
                              {
                                 interiorListTopText.map((datas: any, index: number) =>
                                    <div className={css.interiorDesignTopText} key={`${datas.toptext}_${index}_${index}`} >
                                       {datas.toptext}
                                    </div>
                                 )
                              }
                           </div>
                           <div className={css.interiorDesignTop} >
                              {
                                 interiorListTopText.map((datas: any, index: number) =>
                                    <div className={css.interiorIconsBack} key={`${datas.toptext}_${index}_${index}`} >
                                       <img src={datas.topimage} alt="" />
                                    </div>
                                 )
                              }
                           </div>
                           <div className={css.interiorDesignBottom} >
                              {
                                 interiorListBottomText.map((datas: any, index: number) =>
                                    <div className={css.interiorIconsBottomBack} key={`${datas.toptext}_${index}_${index}`} >
                                       <img src={datas.bottomimage} alt="" />
                                    </div>
                                 )
                              }
                           </div>
                           <div className={`${css.interiorDesignBottom} ${css.interiorDesignBottomOuter}`}  >
                              {
                                 interiorListBottomText.map((datas: any, index: number) =>
                                    <div className={css.interiorDesignbottomText} key={`${datas.bottomtext}_${index}_${index}`} >
                                       {datas.bottomtext}
                                    </div>
                                 )
                              }
                           </div>
                        </div>
                     </div>
                     <div ref={warranty} className={css.warranty}>
                        <div className={css.warrantyInnerLayer}>
                           <div className={css.warrantyInnerTopContent}>
                              <div className={css.warrantyInnerLeftContent}>
                                 <div className={css.warrantyTextIcons}>
                                    {warrantyimage ?
                                       <img loading="lazy" className={css.flatWarrantyiconChangesImg} src={warrantyimage} alt="Warranty" />
                                       :
                                       ''
                                    }
                                 </div>
                                 <div className={css.warrantyHeader}>Flat 10 year warranty</div>
                                 <div className={css.warrantySubText}>Opt for interiors built with the finest materials,
                                    leaving no space for imperfections.</div>
                              </div>
                              {/* icon images changed  start */}
                              <div className={css.warrantyInnerRightContent}>
                                 <div className={css.warrantyTextIcons}>
                                    {calenderimage ?
                                       <img loading="lazy" className={css.warrantyiconChanges} src={calenderimage} alt="Calendar" />
                                       :
                                       ''
                                    }
                                 </div>
                                 <div className={css.warrantyHeader}>45-day delivery</div>
                                 <div className={css.warrantySubText}>Get your dream interiors in just 45 days
                                    our commitment to on-time delivery.</div>
                              </div>
                           </div>
                           <div className={css.warrantyInnerBottomContent}>
                              <div className={css.warrantyInnerLeftContent}>
                                 <div className={css.warrantyTextIcons}>
                                    {expertimage ?
                                       <img loading="lazy" className={css.warrantyiconChanges} src={designimage} alt="Happy Home" />
                                       :
                                       ''
                                    }
                                 </div>
                                 <div className={css.warrantyHeader}>600+ design experts</div>
                                 <div className={css.warrantySubText}>Unleash your creativity and collaborate with our experienced
                                    designers to craft your dream home</div>
                              </div>
                              <div className={css.warrantyInnerRightContent}>
                                 <div className={css.warrantyTextIcons}>
                                    {expertimage ?
                                       <img loading="lazy" className={css.warrantyiconChanges} src={expertimage} alt="Happy Home" />
                                       :
                                       ''
                                    }
                                 </div>
                                 <div className={css.warrantyHeader}>Aftercare and Support</div>
                                 <div className={css.warrantySubText}>Achieve peace of mind with our dedicated care team
                                    supporting you throughout your design journey.</div>
                              </div>
                           </div>
                        </div>
                     </div>
                     {/* icon  images changed finished */}

                     <div ref={guaranteed} className={css.guaranteed}>
                        <div className={css.guaranteedInnerLayer}>
                           <div className={css.guaranteedHeader}>Guaranteed Enjoyment</div>
                           <div className={css.guaranteedBody}>
                              <div className={css.guaranteedBodyBorder}>
                                 <img className={css.googleIcon} src={googleIcon} alt="" />
                                 <div className={css.likeScore}>5/5 (1000+ Reviews)</div>
                                 <div className={css.likeScoreDetail}>02 Cities | 02 Studios</div>
                                 <div className={css.likeScoreDetailLocation}> Coimbatore | Rajapalayam</div>
                              </div>
                              <div className={css.guaranteedRjpamText}><img className={css.guaranteedRjpamImg} src={rajapalayam} alt="" />Rajapalayam</div>
                              <div className={css.guaranteedCbeText}><img className={css.guaranteedRjpamImg} src={coimbatore} alt="" />Coimbatore</div>
                           </div>

                        </div>

                     </div>
                     <div ref={footer} className={css.footer}>
                        <div className={css.footerInnerLayer}>
                           <div className={css.footerLeftContent}>
                              <div id="logo" className={`${css1.lhomelogoholder}`}>
                                 <div className={css1.lhomelogo}>
                                    <div className={`${css1.lhomelogobackground} ${css1.lhomelogomask}`} />
                                 </div>
                              </div>
                              {/* json image was changed (2 images into single image) */}
                              
                              <div className={css.socialMedia}>
                     {
                        socialMediaList.map((datas:any,index:number)=>
                           <img key={index}className = {css.socialMediaIcons} src={datas.image} alt='anything' /> 
                        )
                     } 
                    </div>
                            


                              <div className={css.footerContentSubContent}>
                                 <div><img className={css.footerContentSubContentIcon} src={mobile} alt="M:" />0000-000-0000</div>
                                 <div><img className={css.footerContentSubContentIcon} src={location} alt="L:" />Coimbatore | Rajapalayam</div>
                                 <div><img className={css.footerContentSubContentIcon} src={mail} alt="E-Mail:" />dummy@gmail.com</div>
                              </div>
                           </div>
                           <div className={css.footerContent}>
                              <div className={css.footerContentHeader}>Lhome</div>
                              <div className={css.footerContentSubContent}>
                                 <div>Team</div>
                                 <div>Join Us</div>
                                 <div>Privacy Policy</div>
                                 <div>Refer and Earn</div>
                                 <div>Disclaimer</div>
                              </div>
                           </div>
                           <div className={css.footerContent}>
                              <div className={css.footerContentHeader}>Customer Support</div>
                              <div className={css.footerContentSubContent}>
                                 <div>Raise issue</div>
                                 <div>My issues</div>
                                 <div>Contact us</div>
                                 <div>Get Estimate</div>
                                 <div>FAQs</div>
                              </div>
                           </div>
                           <div className={css.footerContent}>
                              <div className={css.footerContentHeader}>The Design Journal</div>
                              <div className={css.footerContentSubContent}>
                                 <div>Buying Guides</div>
                                 <div>Style Your Home</div>
                                 <div>Interior 101</div>
                                 <div>Interiors By LHome</div>
                                 <div>Lhome in Your City</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </React.Fragment>
   )
}
export default HomePage;