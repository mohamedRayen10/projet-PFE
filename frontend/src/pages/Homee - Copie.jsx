import { Link } from "react-router-dom";
import Head2 from "../components/Head2";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import NewsSwiper from "../components/NewsSwiper";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/backend/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };

    fetchPosts();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Head2 />
      <NewsSwiper />

      {/* Full-Width Video Section */}
      <div className="w-full mb-12">
        <video 
          autoPlay 
          loop 
          muted 
          className="w-full h-[600px] object-cover"
          poster="/images/video-poster.jpg"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

    

      
      

    

    


    

      {/* Existing sections (FAQ, Gallery, Testimonials, CTA) remain here */}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4 shadow-2xl">
            {/* Modal content remains same */}
          </div>
        </div>
      )}
    </div>
  );
}