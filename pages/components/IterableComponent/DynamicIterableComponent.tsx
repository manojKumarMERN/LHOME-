import React from 'react';
import css from "./DynamicIterableComponent.module.scss";
import Image from 'next/image';
import { BsHeart } from "react-icons/bs";
import {FaRegShareFromSquare} from 'react-icons/fa6'

interface properties {
    data: any
}



const DynamicIterableComponent: React.FC<properties> = ({ data }) => {

    return (
        <React.Fragment>
            <div>
                <div className="w-full">
                    <div className={"container-fluid " + css.mainBlock}>
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 ">
                            {
                                data.map((item, index) => (
                                    <div className={"p-3 w-full h-full " + css.divCard} key={index}>
                                        {item.image ?
                                            <div className={css.customdivisionchild}>
                                                <div className={css.customimage}>
                                                    <img loading="lazy" className='' src={item.image} alt='images' />
                                                    <div className={" w-full flex grid-cols-5 "}>
                                                        <div className="w-full col-span-3 ">
                                                            <span className={css.customname + " sm:text-[8px] md:text-[12px]"}>{item.name}</span>
                                                            <span className={css.customtext}>
                                                                {item.size}
                                                            </span>
                                                        </div>
                                                        <div className={'col-span-1 ' + css.com_icons} >
                                                        <span className={css.wishlistholder}>
                                                                {/* <img loading="lazy" className={css.wishlist} src={item.likeIcon} alt="like icon" /> */}
                                                                <BsHeart/>
                                                            </span>
                                                            </div>
                                                            <div className={'col-span-1 ' + css.com_icons}>
                                                            <span className={css.shareholder}>
                                                                {/* <img loading="lazy" className={css.share} src={item.shareIcon} alt="share icon" /> */}
                                                                <FaRegShareFromSquare/>
                                                            </span>
                                                            </div>
                                                            
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className={css.customdivisionchild}>
                                                <div className={css.customGrey + " grid grid-rows-3"}>
                                                    <div className={css.custom_icons}>
                                                        <img src={item.icon} alt="icon" className={css.icon_image} />
                                                    </div>
                                                    <div className='row '>
                                                    <div className='col-lg-2 '></div>
                                                    <div className='col-lg-8 '><p className={css.content} dangerouslySetInnerHTML={{ __html: item.content }}></p></div>
                                                    <div className='col-lg-2 '></div>
                                                    </div>
                                                    <div className='flex w-full h-full justify-center items-center'>
                                                    {item.btn && <button className={css.btnStyle}>{item.btn}</button>}
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default DynamicIterableComponent;
