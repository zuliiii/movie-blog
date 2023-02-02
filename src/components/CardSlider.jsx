// import React, { useRef, useState } from "react";
// import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
// import Card from "./Card";
// import "./CardSlider.css";

// export default React.memo(
//   function CardSlider({ data, title }) {
//     const [showControls, setShowControls] = useState(false);
//     const [sliderPosition, setSliderPosition] = useState(0);
//     const listRef = useRef();
  
//     const handleDirection = (direction) => {
//       console.log(direction);
//       let distance = listRef.current.getBoundingClientRect().x - 70;
  
//       if (direction === "left" && sliderPosition > 0) {
//         listRef.current.style.transform = `translateX(${230 + distance}px)`;
//         setSliderPosition(sliderPosition - 1);
//       }
  
//       if (direction === "right" && sliderPosition < 4) {
//         listRef.current.style.transform = `translateX(${-230 + distance}px)`;
//         setSliderPosition(sliderPosition + 1);
//       }
//     };
  
//     return (
//       <div
//         className="container flex column"
//         onMouseEnter={() => setShowControls(true)}
//         onMouseLeave={() => setShowControls(false)}
//       >
//         <h1>{title}</h1>
//         <div className="wrapper">
//           <div
//             className={`slider-action left ${
//               !showControls ? "none" : ""
//             } flex j-center a-center`}
//           >
//             <AiOutlineLeft onClick={() => handleDirection("left")} />
//           </div>
//           <div className="flex slider" ref={listRef}>
//             {data.map((movie, index) => {
//               return (
//                 <Card
//                   movieData={movie}
//                   index={index}
//                   key={movie.id}
//                   alt="movieimg"
//                 />
//               );
//             })}
//           </div>
//           <div
//             className={`slider-action right ${
//               !showControls ? "none" : ""
//             } flex j-center a-center`}
//           >
//             <AiOutlineRight onClick={() => handleDirection("right")} />
//           </div>
//         </div>
//       </div>
//     );
//   }
// ) 

/************************************************************/

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Card from "./Card";
import "./CardSlider.css";

export default function CardSlider({ data, title }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="cardslider" >
      <h1>{title}</h1>
      <div className="wrapper">
        <Slider {...settings}>
          {data.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                alt="movieimg"
              />
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
