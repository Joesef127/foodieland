import { useState } from "react";
import { NavLink } from "react-router-dom";
import foodieland_logo from "../assets/foodieland_logo.svg";
import SocialMediaBox from "./SocialMediaBox";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex justify-center items-center sticky top-0 z-[50] backdrop-blur-3xl inter border-b border-black/20 bg-white">
      <div className="py-8 w-[90%] max-w-[1440px] flex gap-2.5 justify-between items-center">
        <figure>
          <img
            src={foodieland_logo}
            alt="foodieland"
            className="w-24 md:w-28"
          />
        </figure>

        <button
          className="sm:hidden flex flex-col gap-1.5 items-center justify-center w-8 h-8"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span
            className={`block w-full h-0.5 bg-black transition-transform ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-full h-0.5 bg-black transition-opacity ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-full h-0.5 bg-black transition-transform ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>

        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-6 absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent shadow-md sm:shadow-none p-6 sm:p-0`}
        >
          <NavLink
            to={"/"}
            className="text-gray-800 text-xs sm:text-sm md:text-base hover:bg-indigo-600 focus:bg-indigo-600 hover:text-white focus:text-white transition-colors py-1 md:py-2 px-2 md:px-3 rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to={"/recipes"}
            className="text-gray-800 text-xs sm:text-sm md:text-base hover:bg-indigo-600 focus:bg-indigo-600 hover:text-white focus:text-white transition-colors py-1 md:py-2 px-2 md:px-3 rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Recipes
          </NavLink>
          <NavLink
            to={"/blog"}
            className="text-gray-800 text-xs sm:text-sm md:text-base hover:bg-indigo-600 focus:bg-indigo-600 hover:text-white focus:text-white transition-colors py-1 md:py-2 px-2 md:px-3 rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </NavLink>
          <NavLink
            to={"/contact"}
            className="text-gray-800 text-xs sm:text-sm md:text-base hover:bg-indigo-600 focus:bg-indigo-600 hover:text-white focus:text-white transition-colors py-1 md:py-2 px-2 md:px-3 rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
          <NavLink
            to={"/about"}
            className="text-gray-800 text-xs sm:text-sm md:text-base hover:bg-indigo-600 focus:bg-indigo-600 hover:text-white focus:text-white transition-colors py-1 md:py-2 px-2 md:px-3 rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </NavLink>
        </nav>

        <div className="hidden sm:block">
          <SocialMediaBox />
        </div>
      </div>
    </header>
  );
}
