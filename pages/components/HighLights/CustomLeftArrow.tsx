import React ,{FC,MouseEventHandler } from "react";
import css2 from "./HighLights.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
interface CustomLeftArrowProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const CustomLeftArrow: FC<CustomLeftArrowProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`react-multiple-carousel__arrow ${css2.leftBtn} `}
      >
      <FontAwesomeIcon icon={faChevronLeft} className={css2.Arrow} />
    </button>
  );
};

export default CustomLeftArrow;
