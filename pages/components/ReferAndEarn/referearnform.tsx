import React from "react";
import css from "./referearnform.module.scss";
import Image from "next/image";


const ReferEarnForm =()=>{
    return(
        <>
        <div className={css.referearn_form}>
            <label className={css.referearnform_label}>Generate your referral link:</label>
            <div>
                {/* <input type="text" placeholder="Enter your name" className={css.referearnform_input}/> */}
                <input
                            placeholder="Enter your name"
                            className={`placeholder-shown: border-[#D0D0D0]-200 p-3 ${css.referearnform_input}`}
                        />
            </div>
            <div className={css.referearnform_button}>
                <button className={css.referearnform_button_content}><p className={css.referearnform_button_text}>GENERATE LINK</p></button>
            </div>
            <div  className={css.referearnform_additional_content1}>
                <p className={css.referearnform_additional_content2}>Share the good word</p>
            </div>
            <div className={css.referearn_icondiv}>
                <Image src={require("../../../public/assets/referandearn/socialicon.png")} alt="" className={css.referearn_socialicon}/>
            </div>
        </div>
        

        </>
    )
}
export default ReferEarnForm;





















































































// import React, { useState } from 'react';
// import "./referearnform.module.scss"
// function ToggleSwitch() {
//   const [isOn, setIsOn] = useState(false);

//   const handleToggle = () => {
//     setIsOn(!isOn);
//   };

//   return (
//     <div>
//       <button onClick={handleToggle} className={`toggle-button ${isOn ? 'on' : 'off'}`}>
//         {isOn ? 'ON' : 'OFF'}
//       </button>

//       {isOn ? <Form1 /> : <Form2 />}
//     </div>
//   );
// }

// function Form1() {
//   return (
//     <div>
//       <h2>Form for ON</h2>
//       {/* Add your content for the ON state here */}
//     </div>
//   );
// }

// function Form2() {
//   return (
//     <div>
//       <h2>Form for OFF</h2>
//       {/* Add your content for the OFF state here */}
//     </div>
//   );
// }

// export default ToggleSwitch;
