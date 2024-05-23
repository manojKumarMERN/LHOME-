import React, { FC, useState, MouseEventHandler } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import css from "./wishlisticon.module.scss";

interface WishlistIconProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const WishlistIcon: FC<WishlistIconProps> = ({ onClick }) => {
  const [count, setCount] = useState(0);

  

  return (
    <button className={`wishlist-icon ${css.customWishlistIcon}`}>
      <i className="bi bi-heart"></i>
      <span className={css.countBadge}>{count}</span>
    </button>
  );
};

export default WishlistIcon;
