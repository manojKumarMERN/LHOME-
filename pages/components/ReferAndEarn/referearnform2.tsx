import React from "react";
import css from "./referearnform2.module.scss"
const ReferEarnForm2 = () => {
    return (
        <>
            <div className={css.referearn_form2}>
                <div className={css.referform2_title}>
                    <p className={css.referform2_title_content}>Know someone who might be interested?</p>
                </div>
                <div className={`relative h-11 w-3/4 min-w-[200px]   ${css.referform2_div}`}>
                <input
                            placeholder="City"
                            className ="peer h-full w-full border-b placeholder-gray-700 placeholder-opacity-40 bg-transparent pt-4 pb-1.5 font-Montserrat text-16px font-normal   outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                </div>
                <div className={`relative h-11 w-3/4 min-w-[200px] ${css.referform2_div}`}>
                <input
                            placeholder="Name"
                            className="peer h-full w-full border-b placeholder-gray-700 placeholder-opacity-40 bg-transparent pt-4 pb-1.5 font-Montserrat text-16px font-normal   outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                </div>
                <div className={`relative h-11 w-3/4 min-w-[200px] ${css.referform2_div}`}>
                <input
                            placeholder="Email"
                            className="peer h-full w-full border-b placeholder-gray-700 placeholder-opacity-40 bg-transparent pt-4 pb-1.5 font-Montserrat text-16px font-normal   outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                </div>
                <div className={`relative h-11 w-3/4 min-w-[200px] ${css.referform2_div}`}>
                <input
                            placeholder="Phone Number"
                            className="peer h-full w-full border-b placeholder-gray-700 placeholder-opacity-40 bg-transparent pt-4 pb-1.5 font-Montserrat text-16px font-normal   outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                </div>
                <div className={css.referearnform2_button}>
                <button className={css.referearnform2_button_content}><p className={css.referearnform2_button_text}>I KNOW SOMEONE</p></button>
            </div>
            </div>
        </>
    )
}
export default ReferEarnForm2;