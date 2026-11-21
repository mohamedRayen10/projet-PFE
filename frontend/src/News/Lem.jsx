import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js"; // Added import for toggleTheme action

const apiKey = "2951780a5d36428b8cf51b120f0bfea0";

const Lim = () => {
  const { theme } = useSelector((state) => state.theme); // Access theme from Redux
  const dispatch = useDispatch();
  const [breakingNews, setBreakingNews] = useState(null);
  const [topNews, setTopNews] = useState([]);
  const [sportsNews, setSportsNews] = useState([]);
  const [businessNews, setBusinessNews] = useState([]);
  const [techNews, setTechNews] = useState([]);
  const [sticky, setSticky] = useState(false);

  const fetchData = async (category, pageSize) => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;
    const data = await fetch(url);
    const response = await data.json();
    return response.articles;
  };

  useEffect(() => {
    fetchData("general", 5).then((data) => setBreakingNews(data[0]));
    fetchData("general", 20).then(setTopNews);
    fetchData("sports", 5).then(setSportsNews);
    fetchData("business", 5).then(setBusinessNews);
    fetchData("technology", 5).then(setTechNews);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`min-h-screen text-white"}`}> {/* Dynamically apply theme */}
      


      {breakingNews && (
        <section className="pt-24 px-6">
          <h2 className="text-2xl font-bold text-center mb-4  text-white">Actualités de dernière minute</h2> {/* French for "Breaking News" */}
          <div className={`max-w-4xl mx-auto ${theme === "light" ? "bg-gray-200" : "bg-gray-800"} p-6 rounded-lg`}>
            <img src={breakingNews.urlToImage} alt="Actualités de dernière minute" className="w-full h-64 object-cover rounded" />
            <h2 className={`text-xl mt-4 font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>{breakingNews.title}</h2>
            <p className={`text-gray-400 mt-2 ${theme === "light" ? "text-black" : "text-gray-300"}`}>{breakingNews.description}</p>
          </div>
        </section>
      )}

      
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-4  text-white">Titres principaux</h2> {/* French for "Top Headlines" */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topNews.map((news, index) => (
            <NewsCard key={index} news={news} theme={theme} />
          ))}
        </div>
      </section>
      <section className="px-6 py-12 ">
        <NewsCategory title="Actualités sportives" newsData={sportsNews}  /> {/* French for "Sports News" */}
        <NewsCategory title="Actualités économiques" newsData={businessNews}  /> {/* French for "Business News" */}
        <NewsCategory title="Actualités technologiques" newsData={techNews}  /> {/* French for "Technology News" */}
      </section>

    </div>
  );
};

const NewsCard = ({ news, theme }) => {
  return (
    <div 
      className={`p-4 rounded-lg ${theme === "light" ? "bg-white text-black shadow-md" : "bg-gray-800 text-white shadow-lg"}`}
    >
      <img src={news.urlToImage} alt="News" className="w-full h-40 object-cover rounded" />
      <h2 className={`text-lg font-semibold mt-2 ${theme === "light" ? "text-black" : "text-white"}`}>
        {news.title.length < 100 ? news.title : news.title.slice(0, 100) + "..."}
      </h2>
      <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-red-500 mt-2 block">Lire la suite</a> {/* French for "Read more" */}
    </div>
  );
};

const NewsCategory = ({ title, newsData, theme }) => {
  return (
    <div className="mt-12">
      <h2 className={`text-2xl font-bold text-center mb-4 ${theme === "light" ? "text-black" : "text-white"}`}>{title}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {newsData.map((news, index) => (
          <NewsCard key={index} news={news} theme={theme} />
        ))}
      </div>
    </div>
  );
};

export default Lim;
