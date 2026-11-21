import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const newsData = [
  { title: "Nouvelle 1", description: "Description de la première news", image: "/images/im1.jpg", link: "https://www.babnet.net/cadredetail-304517.asp" },
  { title: "Nouvelle 2", description: "Description de la deuxième news", image: "/images/ww1.png", link: "/news/2" },
  { title: "Nouvelle 3", description: "Description de la troisième news", image: "/images/ww4.png", link: "/news/3" }
];

const NewsSwiper = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full"
      >
        {newsData.map((news, index) => (
          <SwiperSlide key={index}>
            <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <img src={news.image} alt={news.title} className="w-full h-72 object-cover rounded-lg" />
              <h3 className="mt-2 text-lg font-semibold">{news.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{news.description}</p>
              <Link to={news.link} className="text-blue-500 hover:text-blue-700 mt-2 inline-block">
                Voir plus
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsSwiper;
