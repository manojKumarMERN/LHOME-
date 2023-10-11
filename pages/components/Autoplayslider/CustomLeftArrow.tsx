import React ,{FC,MouseEventHandler } from "react";
import css2 from './Autoplay.module.scss';


interface CustomLeftArrowProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const CustomLeftArrow: FC<CustomLeftArrowProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`react-multiple-carousel__arrow ${css2.customLArrowStyle}`}
      style={{ marginTop: "360px" }}
    >
      <i className="bi-arrow-left-short"></i>
    </button>
  );
};

export default CustomLeftArrow;
