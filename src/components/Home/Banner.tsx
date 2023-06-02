import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
  return (
    <>
     <div className='relative'>
     <div className='absolute bottom-0 w-full bg-gradient-to-t from-gray-50 to-transparent h-32 z-10'>
     </div>
        <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
        >

        <div>
            <img loading="lazy" src="/assets/slider1.jpg" alt="Banner1" />
        </div>
        <div>
            <img loading="lazy" src="/assets/slider2.jpg" alt="Banner1" />
        </div>
        <div>
            <img loading="lazy" src="/assets/slider3.jpg" alt="Banner1" />
        </div>
        <div>
            <img loading="lazy" src="/assets/slider4.jpg" alt="Banner1" />
        </div>

        </Carousel>


     </div> 
    </>
  )
}

export default Banner