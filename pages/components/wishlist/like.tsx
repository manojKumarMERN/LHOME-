import React, { FC, MouseEventHandler } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import css from "./wishlisticon.module.scss";

interface WishlistIconProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const LikeIcon: FC<WishlistIconProps> = ({ onClick }) => {

  return (
    <button 
      onClick={onClick}
      className={`wishlist-icon ${css.customWishlistIcon}`}
    >
      <i className="bi bi-heart"></i>
    </button>
  );
};

export default LikeIcon;