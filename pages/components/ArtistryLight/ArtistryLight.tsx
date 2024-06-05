import React, { useState, useEffect } from "react";
import css from "./ArtistryLight.module.scss";
import * as config from "../../../next.config.js";
import { simpleCallInitAPI } from '../../../services/ApicallInit';
import Link from "next/link";
import { FaArrowRight } from 'react-icons/fa';

const ArtistryLightBanner: React.FC = () => {
    const [artistrylightbanner, setArtistryLightBanner] = useState([]);
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;

    useEffect(() => {
        let api = simpleCallInitAPI(`${assetpath}/assets/settings.json`);
        api.then((data: any) => {
            let banerImage = [];
            data.data.settings.artistrylightbanner.forEach((datas: any) => {
                let lc: any = {};
                lc.artistrylightbanner = `${assetpath}${datas.image}`;
                lc.name = datas.text;
                banerImage.push(lc);
            });
            setArtistryLightBanner(banerImage);
        });
    }, [assetpath]);

    return (

        <React.Fragment>

            <div>
                {artistrylightbanner.map((datas: any, index: number) => (
                    <div key={`${datas.name}_${index}_${index}`} className={css.artistrylightContainer}>
                        <img src={datas.artistrylightbanner} alt="bannerImage" className={css.artistrylightimage} />
                        <div className={css.artistrylightbannercontent}>
                            <h2 className={css.artistrylight_tagline}>Transforming spaces </h2> <h2 className={css.artistrylight_tagline1}>with the artistry of light </h2>
                       <Link href={{pathname: '/Texture'}}>
                            <button className={css.bannerbtn} >
                            <div className={css.iconpar}>
                                        <div className={css.btnicon}>To know more about Texture and Materials </div>
                                        <div className={css.circle}><FaArrowRight /></div>
                                    </div>
                 
                      </button></Link>
                        </div>
                    </div>
                ))}

            </div>

        </React.Fragment>
    );
}

export default ArtistryLightBanner;
