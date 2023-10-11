import React, { useRef } from "react";
import css from './Recentproject.module.scss';
import * as config from "../../../next.config.js";
import { simpleCallInitAPI } from '../../../services/ApicallInit';
import Card from 'react-bootstrap/Card';



const RecentProject: React.FC = () => {
  
    const [Toolimage, setToolimage] = React.useState([]);
    const [middleIndex] = React.useState(1);

    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
    React.useEffect(() => {
        let api = simpleCallInitAPI(`${assetpath}/assets/settings.json`);
        api.then((data: any) => {
            let sectionOne = [];
            data.data.settings.recentproject.forEach((connects: any) => {
                let connect: any = {};
                connect.image = `${assetpath}${connects.image}`;
                connect.name = connects.name;
                connect.count = connects.count;
                connect.para = connects.para;
                connect.line = ` ${assetpath}${connects.line}`;

                sectionOne.push(connect);
            });
            setToolimage(sectionOne);
        })
    }, [assetpath]);
    console.log(Toolimage);
    return (
        <>
            <div>
                <div className={css.recenttitle}>
                    Recent Projects
                </div>
                <div className={css.connectfilmrole}>
                    {Toolimage.map((connects: any, index: number) =>
                        <>
                            <div className={css.detailsholder}>
                                <div style={{ backgroundColor: "#FFF;" }} key={`${connects.image}${index}${index}`} className={css.division1}>
                                    <img key={`${connects.image}_${index}`} loading="lazy"
                                        src={connects.image} alt={connects.name} className={connects.name ==='repairtools'? css.recentim : css.recentimg} />
                                    <div className={css.interiorname}>
                                        <div className={css.recentcount}>{connects.count}</div>
                                        <div className={css.recentpara}>{connects.para}</div>
                                    </div>
                                </div>
                            </div>

                            {index <= middleIndex ? (
                                <div className= {css.line}>
                                    <div className="vr" style={{height: "100%" }}></div>
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </>
    )
};

export default RecentProject;