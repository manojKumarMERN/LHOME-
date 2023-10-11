import React,{FC,MouseEventHandler} from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import css2 from "./HighLights.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface CustomRightArrowProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
  }
  
  const CustomRightArrow: FC<CustomRightArrowProps> = ({ onClick }) => {
    return (
      <button 
        onClick={onClick}
        className={`react-multiple-carousel__arrow ${css2.rightBtn} `}
       
      >
      <FontAwesomeIcon icon={faChevronRight} className={css2.Arrow} />
      </button>
    );
  };
  
  export default CustomRightArrow;