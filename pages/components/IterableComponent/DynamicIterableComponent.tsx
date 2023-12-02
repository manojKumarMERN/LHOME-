import React from 'react';
import css from "./DynamicIterableComponent.module.scss";
import Image from 'next/image';
import Modal from 'react-bootstrap/Modal'
import { BsHeart, BsHeartPulseFill } from "react-icons/bs";
import { FaRegShareFromSquare } from 'react-icons/fa6';
import { AiFillCloseCircle } from 'react-icons/ai';
import DetailsOfimg from '../../DetailsOfimg';


interface properties {
    data: any ,
    handlelike : any
}



const DynamicIterableComponent: React.FC<properties> = ({ data ,handlelike }) => {
    const [show, setShow] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);


    const handlePopup = (item) => {
        setSelectedItem(item);
        setShow(true);
    };
    

    const handleClose = () => {
        setShow(false);
    }

    let arr = [];
    const addWishlist = (index) => {
        arr.push(index)
    }

    console.log("data===|||||||||||||||||||||||||||",data)

    return (
        <React.Fragment>
            <div>
                <div className="w-full">
                    <div className={"container-fluid " + css.mainBlock}>
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 ">
                            {
                                data.map((item, index) => (
                                    <div className={"p-3 w-full h-full " + css.divCard} key={index} 
                                    >
                                        {item?.image ?
                                            <div className={css.customdivisionchild}  >
                                                <div className={css.customimage} >
                                                    <img loading="lazy" className='' src={item.image} onClick={() => handlePopup(item) } alt='images' />
                                                    <div className={" w-full flex grid-cols-5 "} style={{padding:"2% 0 3%"}}>
                                                        <div className="w-full col-span-3 " onClick={() => handlePopup(item) }>
                                                            <span className={css.customname + " sm:text-[8px] md:text-[12px]"}>{item.name}</span>
                                                            <span className={css.customtext}>
                                                                {item.size}
                                                            </span>
                                                        </div>
                                                        <div  className={css.dynamicIcons_content}>
                                                        <div className={'col-span-1 ' + css.com_icons} >
                                                            <span className={css.wishlistholder} onClick={() => handlelike(item?.id )}>
                                                                {
                                                                    item?.likes?.includes(3) ? <BsHeartPulseFill /> : <BsHeart /> 
                                                            }
                                                            </span>
                                                        </div>
                                                        <div className={'col-span-1 ' + css.com_icons} >
                                                            <span className={css.shareholder}>
                                                                <FaRegShareFromSquare />
                                                            </span>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className={css.customdivisionchild}>
                                                <div className={css.customGrey + " grid grid-rows-3"}>
                                                <div className='flex flex-column gap-2 items-center'>
                                                    <div className={css.custom_icons}>
                                                        <img src={item.icon} alt="icon" className={css.icon_image} />
                                                    </div>
                                                    <div className='row '>
                                                        <div className='col-lg-2 '></div>
                                                        <div className='col-lg-8 '><p className={css.content} 
                                                        dangerouslySetInnerHTML={{ __html: item.content }}></p></div>
                                                        <div className='col-lg-2 '></div>
                                                    </div>
                                                    </div>
                                                    <div className='flex w-full justify-center'>
                                                        {item.btn && <button className={css.btnStyle}>{item.btn}</button>}
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                    </div>
                                ))
                            }
                            <Modal show={show} onHide={handleClose} className={css.Modal_Popup}>
                                <Modal.Header >
                                    <AiFillCloseCircle onClick={handleClose} />
                                </Modal.Header>
                                <DetailsOfimg data={data} selectedItem={selectedItem}/>

                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default DynamicIterableComponent;
