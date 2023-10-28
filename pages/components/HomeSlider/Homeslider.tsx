import * as React from "react";
import ImageSlider from '../ImageSlider';
import * as config from "../../../next.config.js";
import Form from "./Form";
import css from './Homeslider.module.scss';

interface HomeSliderProps {
  screenwidth: number;
  screenheight: number;
}

const HomeSlider: React.FC<HomeSliderProps> = ({ screenwidth, screenheight }) => {
  const sliderwrap = React.useRef(null);
  const sliderref = React.useRef(null);
  const [swidth, setSWidth] = React.useState(0);
  const [sheight, setSHeight] = React.useState(0);
  let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
  
  React.useEffect(() => {
    setTimeout(() => {
      setSWidth(sliderref.current.offsetWidth);
      setSHeight(sliderref.current.offsetHeight);

        }, 1500)
  }, [screenwidth]);
  
  return (

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
                                 <h1 className={css.tagline1}>Lhome Make<br></br>  Your Home<br></br> Better</h1>
                              </div>
                              :
                              <div className={css.tagline1}>Lhome Make Your Home Better </div>
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
                        <Form />
                        </div>
                     </div>
                  </div>
  );
};
export default HomeSlider;
