import React from "react";
import css from "./DesignGallery.module.scss";
import * as config from "../../../next.config.js";
import { simpleCallInitAPI } from '../../../services/ApicallInit';
import Link from 'next/link'

const DesignGallery: React.FC = () => {
  let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
  const [gallerydesign, setgallerydesign] = React.useState([]);

  React.useEffect(() => {
    let api = simpleCallInitAPI(`${assetpath}/assets/gallery.json`);
    api.then((data: any) => {
      setgallerydesign(data.data.gallery);
    })
      .catch(error => {
        console.log(error);
      });

  }, [assetpath]);

  return (
    <React.Fragment>
      <div className={css.filter_home1}>
        <span className={css.filter_link_span1}><Link href={{ pathname: "/" }} className={css.kitchen_filter_link}>home</Link></span>
        <span className={css.filter_slash}>/</span>
        <span className={css.filter_link_span2}><Link href={{ pathname: "/designgallery" }} className={css.kitchen_filter_link}>design gallery</Link></span>
      </div>
      <header>
        <h2 className={css.heading}>Design Gallery</h2>
        <p className={css.paraheading}> If you’re on the lookout for simple home interior designs, look no further<br />
          than HomeLane for end- to-end interior design services.</p><br />
      </header>
      <div className={"mx-2 " + css.outerLayer}>{gallerydesign.length != 0 ?
        <div className={css.division}>
          <div className="row ">
            {gallerydesign.map((datas: any, index: number) => (
              <div className={"col-sm-6 col-md-4 p-4 " + css.card} key={`${datas.name}_${index}`}>
                <div className={css.gallerytitle}>{datas.title}</div>
                <div className={css.customimage}>
                  <img
                    key={`${datas.name}_${index}`}
                    loading="lazy"
                    src={datas.image}
                    alt={datas.name}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        : <div>loading</div>
      }
      </div>
    </React.Fragment>
  );
};
export default DesignGallery;