import { Navbar } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // For hamburger menu icon

const menu = [
  {
    name: "Accueil",
    path: "/",
    subPages: [
      { name: "Accueil", path: "/" },
      { name: "Intro", path: "/home/intro" },
    ],
  },
  {
    name: "À propos",
    path: "/about",
    subPages: [
      { name: "À propos", path: "/about" },

    ],
  },
  
  {
    name: "Services",
    path: "/services",
    subPages: [
      { name: "Consulting", path: "/Service/" },

    ],
  },



];

const Head2 = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = (e) => {
    if (!e.target.closest(".menu-container")) {
      setOpenMenu(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <Navbar className="border-b px-4 py-3 shadow-md">
      <div className="flex justify-center items-center w-full h-full">
        {/* Mobile Hamburger Menu Icon */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-2xl text-gray-700 dark:text-white"
        >
          {isMobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>

        <div className={`lg:flex ${isMobileMenuOpen ? 'block' : 'hidden'} w-full justify-center`}>
          <Navbar.Collapse className="flex space-x-8 w-full justify-center">
            {menu.map((item, index) => (
              <div key={index} className="relative menu-container">
                {/* Main link */}
                <button
                  onClick={() => setOpenMenu(openMenu === item.name ? null : item.name)}
                  className="hover:text-red-500 focus:outline-none"
                >
                  {item.name}
                </button>

                {/* Dropdown menu (shown when hovering or clicking on the main menu) */}
                {openMenu === item.name && (
                  <ul className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-10">
                    {item.subPages.map((sub, i) => (
                      <li key={i} className="py-1">
                        <Link
                          to={sub.path}
                          className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                          onClick={() => setOpenMenu(null)} // Close menu after click
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Navbar.Collapse>
        </div>
      </div>
    </Navbar>
  );
};

export default Head2;
