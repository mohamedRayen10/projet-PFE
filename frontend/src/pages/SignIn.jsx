import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";
import Head2 from "../components/Head2";
import NewsSwiper from "../components/NewsSwiper";
import { FaFacebook, FaGithub } from "react-icons/fa";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Scroll event to show the back-to-top button
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill in all fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/backend/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all">
      {/* Hero Section with Red Gradient Background */}
      <div className="relative bg-gradient-to-br from-red-600 to-red-800 h-80">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white pt-24">
          <h1 className="text-5xl font-bold">Welcome Back</h1>
          <p className="text-xl mt-4">Sign in to access your account</p>
        </div>
      </div>

      <Head2 />
      <div className="container mx-auto py-16 px-4">
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out">
          {/* Left Side - News Swiper */}
          <div className="md:w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700 rounded-3xl">
          <div className="w-full">
        <video autoPlay loop muted className="w-full min-h-[100px] object-cover" id="vn1">
          <source src="/videos/vn1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
          </div>
          {/* Right Side - Form */}
          <div className="md:w-1/2 p-10 flex flex-col justify-center space-y-6 bg-gray-50 dark:bg-gray-700 rounded-3xl shadow-lg">
            <h2 className="text-4xl font-extrabold text-red-600 dark:text-white text-center mb-6">
              Sign In
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email" value="Your E-mail" className="text-lg font-semibold text-gray-800 dark:text-gray-300" />
                <TextInput
                  id="email"
                  type="email"
                  placeholder="nomprenom@gmail.com"
                  onChange={handleChange}
                  required
                  className="mt-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-red-600 transition duration-200"
                />
              </div>
              <div>
                <Label htmlFor="password" value="Password" className="text-lg font-semibold text-gray-800 dark:text-gray-300" />
                <TextInput
                  id="password"
                  type="password"
                  placeholder="********"
                  onChange={handleChange}
                  required
                  className="mt-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-red-600 transition duration-200"
                />
              </div>
              <Button
                gradientDuoTone="redToOrange"
                type="submit"
                disabled={loading}
                className="w-full py-3 text-lg font-semibold rounded-lg hover:bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 ease-in-out"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="ml-3">Loading...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* OAuth Options */}
              <div className="mt-4 flex justify-center gap-4">
                <OAuth />
              </div>
            </form>

            {/* Social Media Login */}
            <div className="mt-6 text-center text-sm">
              <span className="text-gray-700 dark:text-gray-300">Don't have an account? </span>
              <Link to="/sign-up" className="text-red-500 hover:underline font-semibold">
                Sign Up
              </Link>
            </div>

            {errorMessage && (
              <Alert className="mt-5" color="failure" icon={null}>
                <div className="flex items-center">
                  <span className="font-bold">Error:</span> {errorMessage}
                </div>
              </Alert>
            )}
          </div>
        </div>
      </div>

      {/* Footer Section */}
    

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          className="fixed bottom-6 right-6 bg-red-600 text-white rounded-full p-3 shadow-lg hover:bg-red-700 transition duration-300 ease-in-out"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </Button>
      )}
    </div>
  );
};

export default SignIn;
