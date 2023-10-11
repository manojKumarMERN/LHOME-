import React from "react";
import css from "./customerstoryview.module.scss";
// import circleimage from "../../../public/assets/Homeoffice/homeoffice.png";
import Image from "next/image";
import Recentprojectnav from "../Tabsimage/recentprojectnav";


const CustomerStoryView = ({ data }: any) => {
    console.log(data, "asdfghjkjhgfds")
    return (
        <React.Fragment>
          
                     <div className={css.customerstory}>
                <div className={css.customerstorylayer}>
                    <div className={css.sliderwrapper}>
                        
                        <div className={css.customerstory_content}>
                        <div className={css.customerstory_image}>
                            <Image src={data?.image} width={500} height={500} alt="" className={css.customerstory_circleimage}/>
                        </div>
                            <div className={css.story_contents}>
                                <p className={css.customerstory_title}>{data?.heading}</p>
                                <p className={css.customerstory_sub_title}>{data?.type}</p>
                                <p className={css.customerstory_state}>{data?.place}</p>
                                <p className={css.customerstory_additional_content}>{data?.content}</p>
                            </div>
                            <div >
                            <div className=" flex w-full justify-center items-center">
                            <img src={data?.icon}  alt="lhome" width={100} height={100} className="customerstory_star"/> 
                            </div>
                            <p className={css.customerstory_username}>-Jonhson</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Recentprojectnav/>
            </div>
        
        </React.Fragment>
    )
}

export default CustomerStoryView;