import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CallToAction from "../components/CallToAction";

const imageGroups = [
  {
    title: "Conférence de Montréal",
    images: ["/images/mon1.jpg", "/images/mon2.jpg", "/images/mon3.jpg", "/images/mon4.jpg"],
    link: "http://localhost:5173/post/pihnlol",
  },
  {
    title: " Salon International Tourisme Voyages",
    images: ["/images/sa1.jpg", "/images/sa2.jpg", "/images/sa3.jpg", "/images/sa4.jpg"],
    link: "https://www.facebook.com/cccantun/posts/737077655117958?locale=fr_FR",
  },
  {
    title: "Conférence de Montréal",
    images: ["/images/mon1.jpg", "/images/mon2.jpg", "/images/mon3.jpg", "/images/mon4.jpg"],
    link: "https://www.facebook.com/story.php?story_fbid=876482377844151&id=100064471909061",
  },
  {
    title: "Découverte du Monde",
    images: ["/images/im1.jpg", "/images/im2.jpg", "/images/im3.jpg", "/images/im4.jpg"],
    link: "https://www.facebook.com/story.php?story_fbid=123456789&id=987654321",
  },
];

const Swip1 = () => {
  return (
    <div className=" text-gray-900 dark:text-white transition-all duration-500">
      {/* Header Principal */}
      <div className="h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-extrabold tracking-tight">
          <span className="text-red-600">Nous</span> Conference
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
          Explore the best places around the world with exclusive insights and experiences.
        </p>
        <CallToAction />
      </div>

      {/* Section Swipers */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
        <h4 className="text-4xl font-bold mb-12 uppercase tracking-wide">
          <span className="text-red-600">Explore</span> the World
        </h4>

        {/* Grille contenant les 2 Swipers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
          {imageGroups.map((group, index) => (
            <div key={index} className="relative w-full flex flex-col items-center">
              {/* Titre du Swiper */}
              <h4 className="text-2xl font-semibold mb-4">{group.title}</h4>

              {/* Swiper */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  loop
                  className="rounded-2xl"
                >
                  {group.images.map((image, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={image}
                        alt={`Slide ${i}`}
                        className="w-full h-96 object-cover rounded-xl"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Bouton unique sous chaque Swiper */}
              <a href={group.link} className="w-full mt-6">
                <button className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-red-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-red-600 hover:to-red-800 transform transition-all duration-300 hover:scale-105">
                  Voir Plus
                </button>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Swip1;
