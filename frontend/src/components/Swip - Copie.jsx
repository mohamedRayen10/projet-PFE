import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "/images/im1.jpg",
  "/images/im2.jpg",
  "/images/im3.jpg",
  "/images/im4.jpg",
];


const Swip = () => {
  return (
  <div className="w-full h-screen flex flex-col items-center justify-center    transition-all duration-500">
      {/* Header */}
      <h1 className="text-5xl font-extrabold mb-6">
        <span className="text-red-500">CC</span>CT
      </h1>

      {/* Swiper Slider */}
      <div className="w-full max-w-4xl relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="rounded-xl shadow-2xl"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-80 object-cover rounded-xl border-4 border-red-500"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overlay Text */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black/30 text-white text-3xl font-bold">
          <p className="bg-red-500 px-6 py-3 rounded-lg shadow-md">
            Discover New Places
          </p>
        </div>
      </div>

      {/* Button */}
      
    </div>
  );
};
export default Swip;
