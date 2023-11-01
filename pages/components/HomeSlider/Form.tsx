import React from 'react';3
import css from './Form.module.scss';
import { useRouter } from 'next/router';

const Form: React.FC = () => { 
    const router = useRouter();
    
    return (
        <div className={`${css.designermeetholder}`}>
            <div className={css.designermeet}>
                <div className={css.designermeettitle + ` pl-10`}>
                    Meet a designer
                </div>
                <div id="formentry" className={`flex  gap-6 ${css.inputbox}`}>
                    <div className={`relative h-full w-full min-w-[200px] ${css.marginmove_5}`}>
                        <input
                            placeholder="Enter your name"
                            className={`peer h-full w-full border-b border-blue-gray-200 bg-transparent ${ router.pathname == "/" ? 'pt-3' : 'pt-4' } pb-1.5 font-Montserrat text-16px font-normal placeholder-gray-700 placeholder-opacity-40  outline outline-0 transition-all placeholder-shown:border-blue-gray-800 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${css.forminput}`}/>
                        <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        </label>
               
                    </div>
                    <div className={`relative h-full pr-8 w-full min-w-[200px] ${css.marginmove_2}`}>
                        <input
                            placeholder="Enter your Email"
                            className={`peer h-full w-full  border-b border-blue-gray-200 bg-transparent ${ router.pathname == "/" ? 'pt-3' : 'pt-4' } pb-1.5 font-Montserrat text-16px font-normal placeholder-gray-700 placeholder-opacity-40  outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${css.forminput}`}/>
                        <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        </label>
                    </div>
                </div>
                <div className="flex  gap-6" style={{ width: "100%" }}>
                    <div className={`relative h-full w-full min-w-[200px] ${css.marginmovebig_2}`}>
                        <input
                            placeholder="Enter your Mobile Number"
                            className={`peer h-full w-full border-b border-blue-gray-200 bg-transparent ${ router.pathname == "/" ? 'pt-3' : 'pt-4' } pb-1.5 font-Montserrat text-16px font-normal placeholder-gray-700 placeholder-opacity-40  outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${css.forminput}`}/>
                        <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        </label>
                    </div>
                </div>
                    <div className={css.whatsapplabel}>
                        <div className='w-full flex flex-col justify-end items-end'>
                        <span className={css.label1}>you can reach me on whatsApp</span>
                        <span className={css.label2}>opt for meeting and offer updates on WhatsApp</span>
                        </div>
                        <label className={`${css.whatsappcheckbox}`}>
                            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                        </label>
                    </div>
                <div className="flex  gap-6" style={{ width: "100%", marginTop: "-5px" }}>
                    <div className={`relative h-full w-full min-w-[200px] ${css.marginmovebig_2}`}>
                        <input
                            placeholder="Enter your current residence pincode"
                            className={`peer h-full w-full border-b border-blue-gray-200 bg-transparent ${ router.pathname == "/" ? 'pt-3' : 'pt-4' } pb-1.5 font-Montserrat text-16px font-normal placeholder-gray-700 placeholder-opacity-40  outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${css.forminput}`}/>
                        <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        </label>
                    </div>
                </div>
                <div className={css.designerbookingconfirmationholder} style={{ marginTop: "12px" }}>
                    <button className={css.designerbookingconfirmationbutton}><label>BOOK FREE DESIGN SESSION</label></button>
                </div>
                <div className={css.designerbookingwarningtext}>By submitting this form, you agree to the privacy policy and terms of use</div>
            </div>
        </div>
    );
};

export default Form;