
import * as React from "react";
import css from './category.module.scss';
import * as config from "../../../next.config.js";
import { simpleCallInitAPI } from '../../../services/ApicallInit';
import CircleArrow from "../../../public/assets/SVGIcons/CircleArrow";
import Link from "next/link";

const Category: React.FC = () => {
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;    
    const [listingCategories, setListingCategories] = React.useState([]);
    React.useEffect(() => {
    let api = simpleCallInitAPI(`${assetpath}/assets/settings.json`);
    api.then((data: any) => {
        let lcategories = [];
         data.data.settings.categories.forEach((cats: any) => {
            let lc: any = {};
            lc.image = `${assetpath}${cats.image}`;
            lc.text = cats.text;
            lc.category = cats.category;
            lcategories.push(lc);
         });
        setListingCategories(lcategories);
        
    })
    .catch(error => {
        console.log(error);
    });
}, []);

   return (
      <React.Fragment>
         <div className={css.listingcategory}>
    <div className={css.listingcategoryOuterLayer +` mt-5`}>
        <p className={css.categorytitle}>Listing category<span><CircleArrow scale={".5"} /></span></p>
        <div className={css.listingfilmrole}>
            {
                listingCategories.map((cats: any, index: number) => 
                <div key={`${cats.category}_${index}_${index}`} className={css.division}>
                    <div className={"pe-4 "+css.divisionchild}>
                        <div className={css.categoryimage}>
                            <img key={`${cats.category}_${index}`} loading="lazy" src={cats.image} alt={cats.category} />
                        </div>
                        <div className={css.category}>
                            <div className={css.categoryname}>{cats.category}</div>
                            <div className={css.categorytext}>{cats.text}</div>
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    </div>
    </div>
      </React.Fragment>
   )
}

export default Category;