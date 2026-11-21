import { Avatar, Button, Dropdown, TextInput } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";
import { Link } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice.js";
import logo from "../../dist/assets/logo/imges.png";

const Header = () => {
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState({ tunis: null, montreal: null });
  const [time, setTime] = useState({ tunis: "...", montreal: "..." });
  const [exchangeRate, setExchangeRate] = useState(null);

  const WEATHER_API_KEY = "4509f0bb9d444ad3b5f90405251103"; // Weather API Key
  const TIME_API_KEY = "YVXS6DJQLPSW"; // Time Zone API Key
  const EXCHANGE_API_KEY = "4c75e446665f2141a0bac738"; // ExchangeRate API Key

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch weather and time data
        const [weatherResTunis, weatherResMontreal, timeResTunis, timeResMontreal] = await Promise.all([
          fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Tunis`),
          fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Montreal`),
          fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${TIME_API_KEY}&format=json&by=zone&zone=Africa/Tunis`),
          fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${TIME_API_KEY}&format=json&by=zone&zone=America/Toronto`)
        ]);

        const [weatherTunis, weatherMontreal, timeTunis, timeMontreal] = await Promise.all([
          weatherResTunis.json(),
          weatherResMontreal.json(),
          timeResTunis.json(),
          timeResMontreal.json()
        ]);

        setWeather({
          tunis: weatherTunis.current.temp_c,
          montreal: weatherMontreal.current.temp_c
        });

        setTime({
          tunis: new Date(timeTunis.formatted).toLocaleTimeString(),
          montreal: new Date(timeMontreal.formatted).toLocaleTimeString()
        });

        // Fetch exchange rate data from ExchangeRate API
        const exchangeRes = await fetch(`https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/TND`);
        const exchangeData = await exchangeRes.json();

        setExchangeRate(exchangeData.conversion_rates.CAD); // Get the conversion rate for CAD

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Update time every second
    const interval = setInterval(() => {
      setTime((prevTime) => ({
        tunis: new Date().toLocaleTimeString("en-GB", { timeZone: "Africa/Tunis" }),
        montreal: new Date().toLocaleTimeString("en-GB", { timeZone: "America/Toronto" })
      }));
    }, 1000); // Refresh every second

    return () => clearInterval(interval);
  }, []);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/backend/user/signout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      window.location.href = `/search?query=${searchTerm}`;
    }
  };

  return (
    <div className={`border-b px-4 py-3 shadow-md flex items-center justify-between ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
      </Link>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex flex-grow max-w-md mx-4">
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      {/* Weather, Time, and Exchange Rate Display */}
      <div className="flex gap-6 text-sm">
        <div className="text-center">
          <p className={`text-lg ${theme === "light" ? "text-black" : "text-gray-300"}`}>
            <img src="../../dist/assets/logo/imges2.png" alt="Tunisia Flag" className="w-6 h-6 inline" /> <strong>Tunis</strong>
          </p>
          <p className={`text-${theme === "light" ? "black" : "gray-300"}`}>🌡️ {weather.tunis !== null ? `${weather.tunis}°C` : "..."} </p>
          <p className={`text-${theme === "light" ? "black" : "gray-300"}`}>🕒 {time.tunis}</p>
        </div>
        <div className="text-center">
          <p className={`text-lg ${theme === "light" ? "text-black" : "text-gray-300"}`}>
            <img src="../../dist/assets/logo/imges3.png" alt="Canada Flag" className="w-6 h-6 inline" /> <strong>Montréal</strong>
          </p>
          <p className={`text-${theme === "light" ? "black" : "gray-300"}`}>🌡️ {weather.montreal !== null ? `${weather.montreal}°C` : "..."} </p>
          <p className={`text-${theme === "light" ? "black" : "gray-300"}`}>🕒 {time.montreal}</p>
        </div>

        {/* Currency Exchange Rate */}
        <div className="text-center">
          <p className={`text-lg ${theme === "light" ? "text-black" : "text-gray-300"}`}>
            <strong>Exchange Rate</strong>
          </p>
          <p className={`text-${theme === "light" ? "black" : "gray-300"}`}>
            TND = CAD: {exchangeRate ? `${exchangeRate} CAD` : "..."}
          </p>
        </div>
      </div>

      {/* User Actions */}
      <div className="ml-auto flex items-center gap-3">
        {/* Theme Toggle */}
        <div className="flex items-center gap-2">
          <Button color="gray" pill onClick={() => dispatch(toggleTheme())}>
            {theme === "light" ? <FaSun className="text-gray-700" /> : <FaMoon className="text-gray-700" />}
          </Button>
        </div>

        {/* Language Selector */}
        <div id="language-switcher" className="mt-2">
          <select
            onChange={(e) => {
              const select = document.querySelector('.goog-te-combo');
              if (select) {
                select.value = e.target.value;
                select.dispatchEvent(new Event('change'));
              }
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="">Select Language</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="ar">Arabic</option>
            <option value="zh-CN">Chinese</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        {/* User Profile / Sign In */}
        {currentUser ? (
          <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}>
            <Dropdown.Header>
              <span className="block text-sm font-medium">@{currentUser.username}</span>
              <span className="block text-sm truncate">{currentUser.email}</span>
            </Dropdown.Header>
            <Dropdown.Item as={Link} to="/dashboard?tab=profile">
              Profile
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="redToRed" outline className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
