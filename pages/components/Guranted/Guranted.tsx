
import * as React from "react";
import css from './Guranted.module.scss';
import * as config from "../../../next.config.js";
import { simpleCallInitAPI } from '../../../services/ApicallInit';

const InteriorDesign: React.FC = () => {
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
    const [googleIcon, setGoogleIcon] = React.useState("");
    const [coimbatore, setCoimbatore] = React.useState("");
    const [rajapalayam, setRajapalayam] = React.useState("");
    React.useEffect(() => {
    let api = simpleCallInitAPI(`${assetpath}/assets/settings.json`);
    api.then((data: any) => {
        setRajapalayam(`${assetpath}${data.data.settings.rajapalayam}`);
        setCoimbatore(`${assetpath}${data.data.settings.coimbatore}`);
        setGoogleIcon(`${assetpath}${data.data.settings.google}`);
    })
    .catch(error => {
        console.log(error);
    });
 }, [assetpath]);

   return (
      <React.Fragment>
         <div  className={css.guaranteed}>
            <div className={css.guaranteedInnerLayer}>
               <div className={css.guaranteedHeader}>Guaranteed Enjoyment</div>
               <div className={css.guaranteedBodyParent}>
               <div className={css.guaranteedBody}>
                  <div className={css.guaranteedBodyBorder}>
                     <img className={css.googleIcon} src={googleIcon} alt="" />
                     <div className={css.likeScore}>5/5 (1000+ Reviews)</div>
                     <div className={css.likeScoreDetail}>02 Cities | 02 Studios</div>
                     <div className={css.likeScoreDetailLocation}> Coimbatore | Rajapalayam</div>
                  </div>
                  <div className={css.guaranteedBodyLine}><hr id="verticaldivider" className={css.verticaldivider} /></div>
                  <div className={css.guaranteedRjpamText}><img className={css.guaranteedRjpamImg} src={rajapalayam} alt="" />Rajapalayam</div>
                  <div className={css.guaranteedCbeText}><img className={css.guaranteedRjpamImg} src={coimbatore} alt="" />Coimbatore</div>
               </div>
               </div>
            </div>
      </div>
      </React.Fragment>
   )
}

export default InteriorDesign;