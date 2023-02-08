import React from "react";
import background from "../assets/login.jpg";
import styled from "styled-components";

export default function BackgroundImage() {
  '.slider'.slick({
    autoplay: true,
    draggable: true,
    arrows: false,
    dots: true,
    fade: true,
    speed: 2000,
    infinite: true,
    cssEase: 'ease',
    touchThreshold: 100
  })
  return (
    <Container>
      <div class="slideshow">
  <div class="slider">
    <div class="item">
      <img src="https://images.unsplash.com/photo-1445768593937-05a3f7832b68?dpr=1&auto=compress,format&crop=entropy&fit=crop&w=700&h=500&q=80" />
    </div>
    <div class="item">
      <img src="https://images.unsplash.com/photo-1443363742879-63e3d75de2f8?dpr=1&auto=compress,format&crop=entropy&fit=crop&w=700&h=500&q=80" />
    </div>
    <div class="item">
      <img src="https://images.unsplash.com/photo-1445964047600-cdbdb873673d?dpr=1&auto=compress,format&crop=entropy&fit=crop&w=700&h=500&q=80" />
    </div>
    <div class="item">
      <img src="https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?dpr=1&auto=compress,format&crop=entropy&fit=crop&w=700&h=500&q=80" />
    </div>
  </div>
</div>
      {/* <img src={background} alt="backgroundImg" /> */}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  img {
    height: 100vh;
    width: 100vw;
  }
  .slideshow {
    position: relative;
    z-index: 1;
    height: 100%;
    max-width: 700px;
    margin: 50px auto;
    
    * {
      outline: none;
    }
    
    .slider {
      box-shadow: 0 20px 50px -25px rgba(0, 0, 0, 1);
    }
    
    .slider-track {
      transition: all 1s ease;
    }
    
    .item {
      height: 100%;
      position: relative;
      z-index: 1;
      
      img {
        width: 100%;
      }
     
    }
  }
`;
