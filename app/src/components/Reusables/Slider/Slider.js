import { Carousel } from 'react-responsive-carousel';
import React from 'react';
import './Slider.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import paw from "../../Images/paw.png"
import dog3 from "../../Images/dog3.jpg"
const Slider = () => {
    return (
      <div className="slider-container">
      <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false} >
        <div >
          <img className='slideimg' src={paw} alt="Slider Image 1" />
        </div>
        <div>
          <img className='slideimg' src={dog3} alt="Slider Image 2" />
        </div>
       
      </Carousel>
      </div>
    );
  }
export default Slider  
