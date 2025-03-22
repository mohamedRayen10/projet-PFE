import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import Head2 from "../components/Head2";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Swip from "../components/Swip";
import NewsSwiper from "../components/NewsSwiper";
import Lem from '../News/Lem';
export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/backend/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };

    fetchPosts();
  }, []);
  return (
    <div>
      <Head2 />
      <NewsSwiper />

      <div className="flex flex-col md:flex-row items-center gap-6 p-10 max-w-6xl mx-auto">
        <img
          src="../../dist/assets/logo/images.jpg"
          alt="CCCT Banner"
          className="w-32 h-32 object-cover rounded-lg shadow-md md:w-48 md:h-48"
        />

        <div className="flex flex-col">
          <h1 className="text-xl font-bold md:text-3xl">Welcome To CCCT</h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            La CCCT promeut l'échange commercial entre le Canada, l'Afrique et
            la Région Arabe via la Tunisie
          </p>
          <Link
            to="/search"
            className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
          >
            View all posts
          </Link>
        </div>
      </div>


  {/* Background Video */}
  <div className="relative min-h-screen overflow-hidden">
  {/* 🎥 Ultra-Clear Video Background */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
    style={{
      filter: "none",         // ✅ no blur
      opacity: 1,             // ✅ full clarity
      transform: "none",      // ✅ no distortion
    }}
  >
    <source src="/videos/1st.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Foreground Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
    <div className="p-6 rounded-xl shadow-xl bg-transparent">
      <Swip />
    </div>
  </div>
  </div>
  

      <div className="flex flex-col md:flex-row items-center gap-6 p-10 max-w-6xl mx-auto ">
        <img
          src="../../dist/assets/logo/images.png"
          alt="CCCT Banner"
          className="w-32 h-32 object-cover rounded-lg shadow-md md:w-48 md:h-48"
        />

        <div className="flex flex-col">
          <h1 className="text-xl font-bold md:text-3xl">Welcome to my Blog</h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            Here you'll find a variety of articles and tutorials on topics such
            as web development, software engineering, and programming languages.
          </p>
          <Link
            to="/search"
            className="text-xs sm:text-sm text-red-500 font-bold hover:underline"
          >
            View all posts
          </Link>
        </div>
      </div>

      <div
        className="p-3 dark:bg-slate-700 bg-fixed"
        style={{
          backgroundImage: "url('/images/bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          animation: "moveBg 10s linear infinite",
        }}
      >
        <CallToAction />
      </div>

      <style>
        {`
    @keyframes moveBg {
      0% { background-position: 0% 0%; }
      100% { background-position: 100% 100%; }
    }
  `}
      </style>

    <div
        className="p-3 dark:bg-slate-700 bg-fixed"
        style={{
          backgroundImage: "url('/images/bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          animation: "moveBg 10s linear infinite",
        }}
      >
        <Lem />
      </div>

      <style>
        {`
    @keyframes moveBg {
      0% { background-position: 0% 0%; }
      100% { background-position: 100% 100%; }
    }
  `}
      </style>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-red-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
