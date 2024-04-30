import React from 'react';
import { Link } from 'react-router-dom';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'; 
import Filter from '../Components/Util/Filter';



import Carousel3 from '../img/Carousel3.jpg';
import Carousel4 from '../img/Carousel4.jpg';
import Carousel5 from '../img/Carousel5.jpg';
import Carousel6 from '../img/Carousel6.jpg';
import AutoCarousel1 from '../img/AutoCarousel1.jpg';
import AutoCarousel5 from '../img/AutoCarousel5.jpg';
import AutoCarousel3 from '../img/AutoCarousel3.jpg';
import AutoCarousel4 from '../img/AutoCarousel4.jpg';




const Home: React.FC = () => {
  const Homeslides = [
    Carousel6,
    Carousel3,
    Carousel4,
    Carousel5
  ];

  const Autoslides = [
    AutoCarousel5,
    AutoCarousel3,
    AutoCarousel1,
    AutoCarousel4
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };


  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center items-center mx-auto md:px-8 max-w-screen-xl min-h-[700px] py-8 px-4">
        <div className="order-2 md:order-1 w-full md:w-1/2 lg:w-1/4 xl:w-1/3 flex flex-col items-center justify-center space-y-4 pr-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-800">
            Find A Perfect Home To Live With Your Family
          </h1>
          <p className="text-base md:text-lg text-center text-gray-600">
            Whether you're in the market to purchase a new home, seeking a cozy
            apartment to rent, or considering selling your property, we provide
            personalized solutions to help you navigate your real estate
            journey. Find the perfect space that feels like home.
          </p>
          <Link
            to={"/real-estate-home"}
            className="btn bg-yellow-500 hover:bg-yellow-400 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg"
          >
            Get Started
          </Link>
        </div>

        <div className="order-1 md:order-2 w-full md:w-1/2 lg:w-3/4 xl:w-2/3 mb-8  md:pt-4 md:mb-0">
          <Slider {...settings}>
            {Homeslides.map((slide, index) => (
              <div
                key={index}
                className="w-full flex justify-center items-center"
              >
                <img
                  src={slide}
                  alt={`Slide ${index}`}
                  className="w-full object-cover h-[500px] pt-10"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center mx-auto md:px-8 max-w-screen-xl min-h-[700px] py-8 px-4">
        <div className="w-full md:w-1/2 lg:w-3/4 xl:w-2/3 mb-8 md:mb-0 pr-8">
          <Slider {...settings}>
            {Autoslides.map((slide, index) => (
              <div
                key={index}
                className="w-full flex justify-center items-center"
              >
                <img
                  src={slide}
                  alt={`Slide ${index}`}
                  className="w-full object-cover h-[500px]"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/3 flex flex-col items-center justify-center space-y-4 pr-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-800">
            Find Your Ideal Car Experience
          </h1>
          <p className="text-base md:text-lg text-center text-gray-600">
            Whether you're looking to buy a new car, rent a vehicle for your
            next adventure, or sell your current ride, we've got you covered.
            Explore our wide range of automotive options tailored to fit your
            lifestyle and needs.
          </p>
          <Link
            to={"/vehicle-home"}
            className="btn bg-yellow-500 hover:bg-yellow-400 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
