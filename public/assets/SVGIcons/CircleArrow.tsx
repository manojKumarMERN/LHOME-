import React from "react";

interface imageProps{
  scale:string;
}
const CircleArrow: React.FC<imageProps> = ({
  scale
}) => {
  return(
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<g transform = {`scale(${scale})`}>
<circle cx="20" cy="20" r="20" fill="#F44336"/>
<path d="M32.0607 21.0607C32.6464 20.4749 32.6464 19.5251 32.0607 18.9393L22.5147 9.3934C21.9289 8.80761 20.9792 8.80761 20.3934 9.3934C19.8076 9.97919 19.8076 10.9289 20.3934 11.5147L28.8787 20L20.3934 28.4853C19.8076 29.0711 19.8076 30.0208 20.3934 30.6066C20.9792 31.1924 21.9289 31.1924 22.5147 30.6066L32.0607 21.0607ZM8 21.5H31V18.5H8V21.5Z" fill="white"/>
</g>
</svg>
  )    
}

export default CircleArrow;      