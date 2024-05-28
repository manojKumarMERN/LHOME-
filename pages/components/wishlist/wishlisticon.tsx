import React, { FC, MouseEventHandler } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import css from "./wishlisticon.module.scss";

interface WishlistIconProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  wishlistCount: number; // Add wishlistCount as a prop
}

const WishlistIcon: FC<WishlistIconProps> = ({ onClick, wishlistCount }) => {
  return (
    <button className={`wishlist-icon ${css.customWishlistIcon}`} onClick={onClick}>
      <i className="bi bi-heart"></i>
      <span className={css.countBadge}>{wishlistCount}</span> {/* Use wishlistCount for the badge */}
    </button>
  );
};

export default WishlistIcon;
