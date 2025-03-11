import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./TrustedBrand.css"; // Assuming this contains custom styles for your carousel

// fetch("../../../../JsonFile/ProjectsJson/projects.json")

const TrustedBrand = () => {
  // Initialize the Keen Slider
  const carousel = (slider) => {
    const z = 300;

    function rotate() {
      const deg = 360 * slider.track.details.progress;
      slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
    }

    slider.on("created", () => {
      const deg = 360 / slider.slides.length;
      slider.slides.forEach((element, idx) => {
        element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`;
      });
      rotate();
    });

    slider.on("detailsChanged", rotate);
  };

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      selector: ".carousel__cell",
      renderMode: "custom",
      mode: "free-snap",
    },
    [carousel]
  );

  return (
    <div className="bg-gray-100">
        {/* Title Section */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 text-center pt-10">
        Our Trusted Brands
      </h2>

      {/* Descriptive Text Section */}
      <p className="pb-5 text-lg sm:text-lg text-gray-600 text-center mb-10 px-4 md:px-16">
        We take pride in partnering with industry-leading brands that share our
        commitment to quality, reliability, and excellence. Discover the trusted
        brands that help us deliver the best products and services to our valued
        customers.
      </p>
      {/* Carousel Section */}
      <div className="wrapper pb-10">
        <div className="scene">
          <div className="carousel keen-slider" ref={sliderRef}>
            <div className="carousel__cell number-slide1">
              <img src="./brand01.jpg" alt="Brand 1" />
            </div>
            <div className="carousel__cell number-slide2">
              <img src="./brand02.jpg" alt="Brand 2" />
            </div>
            <div className="carousel__cell number-slide3">
              <img src="./brand03.jpg" alt="Brand 3" />
            </div>
            <div className="carousel__cell number-slide4">
              <img src="./brand04.jpg" alt="Brand 4" />
            </div>
            <div className="carousel__cell number-slide5">
              <img src="./brand05.jpg" alt="Brand 5" />
            </div>
            <div className="carousel__cell number-slide6">
              <img src="./brand06.jpg" alt="Brand 6" />
            </div>
            <div className="carousel__cell number-slide6">
              <img src="./brand07.jpg" alt="Brand 6" />
            </div>
            <div className="carousel__cell number-slide6">
              <img src="./brand08.jpg" alt="Brand 6" />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBrand;
