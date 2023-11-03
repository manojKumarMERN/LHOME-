import * as React from "react";
import css from '../../styles/HomePage.module.scss';
import PageHeader from "./PageHeader";
import * as config from "../../next.config.js";
import "react-multi-carousel/lib/styles.css";
import Homeslider from "./HomeSlider/Homeslider";
import Category from "../components/category/category";
import ReferNowPage from "../components/ReferNow/ReferNowPage";
import NRIFriendly from "../components/NRIFriendly/NRIFriendly";
import Footer from "../components/Footer/Footer";
import InteriorDesign from "../components/InteriorDesign/InteriorDesign";
import Warranty from "../components/warranty/Warranty";
import Guranted from "../components/Guranted/Guranted";
import HightLights from "../components/HighLights/HighLights";
import Autoplay from './Autoplayslider/Autoplayslider';
import WhyLhome from './whyLhome/whyLhome';
import Zigzag from "./zigzag/Zigzag";

interface homeproperties {
   screenwidth: number;
   screenheight: number;

}

const HomePage: React.FC<homeproperties> = ({ screenwidth, screenheight }) => {

   let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
   const living = React.useRef(null);

   const Cclass: string = "peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50";



   return (
      <React.Fragment>
         <div className="animate-fade-in">
            <div className={css.lhomePage}>
               <PageHeader screenwidth={screenwidth} screenheight={screenheight} assetpath={assetpath} hidden={false} />
               <div className={css.LhomeBottom}>
                  <div><Homeslider screenwidth={screenwidth} screenheight={screenheight} /></div>
                  <div><WhyLhome screenwidth={screenwidth} screenheight={screenheight} /></div>
                  <div className={css.categoryComponent}><Category /></div>
                  <div><HightLights /></div>
                  <div><ReferNowPage /></div>
                  <div className="mt-[100px]">
                     <Autoplay living={living} />
                  </div>
                  <div><NRIFriendly /></div>
                  <div>
                     <h3 className={css.zigzag_heading}>Full-service Interior Design</h3>
                     <div><Zigzag /></div>
                  </div>
                  <div><Warranty /></div>
                  <div><Guranted /></div>
                  <div><Footer /></div>
               </div>
            </div>

         </div>
      </React.Fragment>
   )
}

export default HomePage;