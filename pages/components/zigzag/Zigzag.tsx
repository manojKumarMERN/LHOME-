import React from "react";
import { Fragment } from "react";
import { simpleCallInitAPI } from '../../../services/ApicallInit';
import * as config from "../../../next.config";
import css from './zigzag.module.scss';
function Zigzag(){
    const[animationGif,setAnimationGif]=React.useState([]);
    const [isAnimationPaused, setIsAnimationPaused] = React.useState(false);
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
    
    React.useEffect(()=>{
        let api = simpleCallInitAPI(`${assetpath}/assets/zigzag.json`);
       
        api.then((data: any) => {
            let AnimationGifImage = [];
            console.log(data);
            data?.data?.zigzag?.forEach((datas: any) => {
                let lc: any = {};
                lc.AnimationImage = `${assetpath}${datas.image}`;
                lc.AnimationAlt = `${assetpath}${datas.alt}`;
                AnimationGifImage.push(lc);
            });
            setAnimationGif(AnimationGifImage);
        });
    }, []);
    console.log(animationGif);
    return(
        <Fragment>
             {animationGif.map((datas: any) => ( 
            <div>
                <img src={datas.AnimationImage} alt={datas.AnimationAlt} className={`${css.gif_image} ${isAnimationPaused ? css.pausedAnimation : ''}`}/>
            </div>
             ))}
        </Fragment>
    )
}
export default Zigzag;