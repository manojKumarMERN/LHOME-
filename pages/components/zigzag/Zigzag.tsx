import React, { Fragment, useState, useEffect } from "react";
import { simpleCallInitAPI } from '../../../services/ApicallInit';
import * as config from "../../../next.config";
import css from './zigzag.module.scss';

function Zigzag() {
    const [animationGif, setAnimationGif] = useState([]);
    const [isAnimationPaused, setIsAnimationPaused] = useState(false);
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;

    useEffect(() => {
        let api = simpleCallInitAPI(`${assetpath}/assets/zigzag.json`);
    
        api.then((data) => {
            console.log("Received data:", data);
            setAnimationGif(data?.data?.zigzag || []);
        });
    }, [assetpath]);

    const handleMouseEnter = () => {
        console.log("Mouse entered");
        setIsAnimationPaused(true);
    };

    const handleMouseLeave = () => {
        console.log("Mouse left");
        setIsAnimationPaused(false);
    };
    console.log(animationGif);
    console.log("isAnimationPaused:", isAnimationPaused);

    return (
        <Fragment>
            {animationGif.map((datas, index) => (
                <div key={index}>
                    <img
                        src={isAnimationPaused ? datas["image"] : datas["image1"]}
                        alt={datas.alt}
                        className={css.gif_image}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />  
                </div>
            ))}
        </Fragment>
    )
}

export default Zigzag;
