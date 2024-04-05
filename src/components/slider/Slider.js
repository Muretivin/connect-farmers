import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { sliderData } from './Slider-data';
import "./Slider.scss";
const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;
    console.log(slideLength);

    const autoscroll = true;
    let slideInterval;
    let intervalTime = 5000;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    };
    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1  : currentSlide - 1);
    };

    useEffect(() => {
        setCurrentSlide(0);

    }, []);

    function auto () {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    useEffect(() => {
        if(autoscroll){
            auto();
        }
        return () => clearInterval(slideInterval);

    }, [currentSlide]);
  return (
    <div className='slider'>
        <ArrowBackIcon  className="arrow prev" onClick={prevSlide}/>
        <ArrowForwardIcon  className="arrow next" onClick={nextSlide}/>
        {sliderData.map((slide, index) => {
            const {image, heading, desc} = slide
            return(
                <div key={index} className={index === currentSlide ? "slide current" : "slide"}>

                    {index === currentSlide && (
                        <>

                          <img src={image} alt="slide" />
                          <div className='content'>
                            <h2>{heading}</h2>
                            <p>{desc}</p>
                            <hr />
                            <a href="#product" className='--btn --btn-primary'>
                                Shop Now
                            </a>
                          </div>
                        </>
                    )}

                </div>
            )
        })}
    </div>
  )
}

export default Slider