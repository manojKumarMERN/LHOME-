import React from "react";
import css from "./Customersupport.module.scss";
import * as config from "../../../next.config.js";
import { simpleCallInitAPI } from '../../../services/ApicallInit';
import Image from "next/image";
const MyIssue = () => {
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
    const [Customersupport, setCustomersupport] = React.useState([]);

    React.useEffect(() => {
        let api = simpleCallInitAPI(`${assetpath}/assets/customersupport.json`);
        api.then((data: any) => {
            let sectionOne = [];
            data.data.values.forEach((support: any) => {
                let supports: any = {};
                supports.text = support.text;
                supports.time = support.time;
                sectionOne.push(supports);
            });
            setCustomersupport(sectionOne);
        })
    }, [assetpath]);
    return (
        <>
            <React.Fragment>
                <div className={css.dummycontainer}>
                    {Customersupport.length === 0 ?
                        <div className="flex">
                            <Image src={require("../../../public/assets/Tabimage/hand.jpg")} alt="" className={css.handicon} />
                            <div className={css.noissue}>No Issues Found!</div>
                        </div>
                        : Customersupport.map((issues, index) => (
                            <div className={css.Box} key={index}>
                                <span className={css.content}>{issues.text}</span>
                                <p className={css.time}>{issues.time}</p>
                            </div>))
                    }
                </div>
            </React.Fragment>


        </>
    )
}
export default MyIssue;





















































































