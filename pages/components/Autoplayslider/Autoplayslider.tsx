import React from "react";
import Carousel from "react-multi-carousel";
import css2 from './Autoplay.module.scss';
import CustomLeftArrow from "./CustomLeftArrow";
import CustomRightArrow from "./CustomRightArrow";
import "react-multi-carousel/lib/styles.css";

interface playproperties {
  living: any
}

const Autoplay: React.FC<playproperties> = ({ living }) => {


  const [activeSlide, setActiveSlide] = React.useState(0);
  const [centerImageIndex, setCenterImageIndex] = React.useState<number>(1);

  const sliderImageUrl = [
    {
      url: "/assets/bottomcarousel/Maskgroup.svg",
      url2: "/assets/icons/play.png",
      heading: "kalai and Family",
      house: "2BHK",
      para: "We’re really happy with the materials that were used and the timeline for the project.The reaction we got from our friends when they first saw our place was priceless."

    },
    {
      url: "/assets/bottomcarousel/Maskgroup.svg",
      url2: "/assets/icons/play.png",
      heading: "sethu and Family",
      house: "2BHK",
      para: "We’re really happy with the materials that were used and the timeline for the project.The reaction we got from our friends when they first saw our place was priceless."

    },
    {
      url: "/assets/bottomcarousel/Maskgroup.svg",
      url2: "/assets/icons/play.png",
      heading: "John and Family",
      house: "2BHK",
      para: "We’re really happy with the materials that were used and the timeline for the project.The reaction we got from our friends when they first saw our place was priceless."

    },
    {
      url: "/assets/bottomcarousel/Maskgroup.svg",
      url2: "/assets/icons/play.png",
      heading: "Prabhu and Family",
      house: "2BHK",
      para: "We’re really happy with the materials that were used and the timeline for the project.The reaction we got from our friends when they first saw our place was priceless."

    },
    {
      url: "/assets/bottomcarousel/Maskgroup.svg",
      url2: "/assets/icons/play.png",
      heading: "Kali and Family",
      house: "2BHK",
      para: "We’re really happy with the materials that were used and the timeline for the project.The reaction we got from our friends when they first saw our place was priceless."

    }, {
      url: "/assets/bottomcarousel/Maskgroup.svg",
      url2: "/assets/icons/play.png",
      heading: "Selva and Family",
      house: "2BHK",
      para: "We’re really happy with the materials that were used and the timeline for the project.The reaction we got from our friends when they first saw our place was priceless."

    },

  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 767, min: 601 },
      items: 2,
      slidesToSlide: 1,
    },
    mini: {
      breakpoint: { max: 600, min: 200 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const handleSlideChange = (currentSlide: number) => {
    setActiveSlide(currentSlide);
    let centerIndex = (currentSlide + 2) % sliderImageUrl.length;
    setCenterImageIndex(centerIndex);
  };

  return (
    <React.Fragment>
      <div ref={living} className={css2.living}>
        <div className={css2.toppickstitle}>
          Contented Living with Lhome
        </div>
        <div className={"container " + css2.bottomcarousel}>
          <Carousel

            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={true}
            partialVisible={true}
            dotListClass={
              "custom-dot-list-style " + css2.customDotListStyle

            }
            customLeftArrow={<CustomLeftArrow onClick={() => { }} />}
            customRightArrow={<CustomRightArrow onClick={() => { }} />}

            afterChange={handleSlideChange}
          >
            {
              sliderImageUrl.map((imageUrl, index) => {

                const isCenterSlide = index === centerImageIndex;

                return (
                  <div className="slider p-4 highlightImage" key={index}>
                    <img
                      className={`${css2.maskgroupimage} ${index === centerImageIndex ? css2.centeredImage : ''}`}
                      src={imageUrl.url}
                      alt="lhome"
                    />
                    {isCenterSlide && (
                      <div className={isCenterSlide ? css2.activeText : ''}>
                        <h3>{imageUrl.heading}</h3>
                        <label>{imageUrl.house}</label>
                        <p>{imageUrl.para}</p>
                      </div>
                    )}
                  </div>

                );
              })
            }

          </Carousel>
        </div>
      </div >
    </React.Fragment >
  )


}

export default Autoplay;