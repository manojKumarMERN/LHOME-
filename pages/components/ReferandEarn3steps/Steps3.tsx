import React, { useState, useEffect } from "react";
import css2 from './Steps3.module.scss';

import css from "styled-jsx/css";

const Autoplay: React.FC<{ living: any }> = ({ living }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderData = [
        {
            url: "/assets/referandearn/Lhome - refer & earn vector-01.png",
            title: "Refer",
            description: "Tell your friends about us",
        },
        {
            url: "/assets/referandearn/Lhome - refer & earn vector-02.png",
            title: "Relax",
            description: "Your friend books us",
        },
        {
            url: "/assets/referandearn/Lhome - refer & earn vector-03.png",
            title: "Rejoice",
            description: "Your friends pay us half, we pay you full",
        }
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
        }, 4000); // Change slide every 3 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []); // Run effect only once when component mounts

    const handleButtonClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div ref={living} className={css2.living}>
            <div className={css2.bottomcarousel}>
                <div className={css2.gridContainer}>
                    <div className={css2.imageColumn}>
                        {sliderData.map((slide, index) => (
                            <div
                                key={index}
                                className={`${css2.slideContainer} ${index === activeIndex ? css2.activeSlide : ""}`}
                            >
                                {index === activeIndex && (
                                    <img
                                        className={css2.maskgroupimage}
                                        src={slide.url}
                                        alt="lhome"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={css2.textColumn}>
                        <div className={css2.activeText}>
                            <h3 className={css2.referandearnhead}>Refer and Earn in 3 easy steps</h3>
                            <div className={css2.buttonsContainer}>
                                <button
                                    className={`${css2.button} ${css2.button1} ${activeIndex === 0 ? css2.activeButton : ""}`}
                                    onClick={() => handleButtonClick(0)}
                                >
                                    1
                                </button>
                                <button
                                    className={`${css2.button} ${css2.button2} ${activeIndex === 1 ? css2.activeButton : ""}`}
                                    onClick={() => handleButtonClick(1)}
                                >
                                    2
                                </button>
                                <button
                                    className={`${css2.button} ${css2.button3} ${activeIndex === 2 ? css2.activeButton : ""}`}
                                    onClick={() => handleButtonClick(2)}
                                >
                                    3
                                </button>
                            </div>
                            <div className={css2.textGrid}>
                                <h3 className={css2.referandearntitle}>{sliderData[activeIndex].title}</h3>
                                <label className={css2.referandearndec}>{sliderData[activeIndex].description}</label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Autoplay;
