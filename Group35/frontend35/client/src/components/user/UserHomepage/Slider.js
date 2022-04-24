import React from "react"
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from "./Images/h4-slide-i.png"
import image2 from "./Images/h4-slide2-i1.png"
import image3 from "./Images/h4-slide3-i2.png"
import image4 from "./Images/h4-slide4-i3.png"
import image5 from "./Images/h4-slide5-i4.png"

//slider for catgory page

function Slider(){
    return (
        <>
            <AliceCarousel autoPlay autoPlayInterval="1000">
                <img src={image1} className="sliderimg" alt=""/>
                <img src={image2} className="sliderimg" alt=""/>
                <img src={image3} className="sliderimg" alt=""/>
                <img src={image4} className="sliderimg" alt=""/>
                <img src={image5} className="sliderimg" alt=""/>
            </AliceCarousel>
        </>
    );
}

export default Slider;