import React,{FC,MouseEventHandler} from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import css2 from './Autoplay.module.scss'


interface CustomRightArrowProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
  }
  
  const CustomRightArrow: FC<CustomRightArrowProps> = ({ onClick }) => {
    return (
      <button 
        onClick={onClick}
        className={`react-multiple-carousel__arrow ${css2.customRArrowStyle}`}
        style={{ marginTop: "360px" }}
      >
        <i className="bi-arrow-right-short"></i>
      </button>
    );
  };
  
  export default CustomRightArrow;