import SocialMediaBox from "./SocialMediaBox";
import foodieland_logo from "../assets/foodieland_logo.svg";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const currentYear: number = new Date().getFullYear();
  return (
    <footer className="flex flex-col justify-center items-center w-full bg-white py-8">
      <div className="w-[90%] max-w-[1440px] flex flex-col justify-between items-center">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col items-start gap-4 md:text-left">
            <figure>
              <img
                src={foodieland_logo}
                alt="foodieland"
                className="w-24 md:w-28"
              />
            </figure>
            <p className="text-sm md:text-base text-gray-500 max-w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Discover
              the best recipes and culinary tips.
            </p>
          </div>

          <nav className="flex flex-wrap justify-start items-center md:justify-end gap-6 text-sm md:text-base">
            <NavLink
              to={"/recipes"}
              className="text-gray-800 hover:text-indigo-600 focus:text-indigo-600 transition-colors"
            >
              Recipes
            </NavLink>
            <NavLink
              to={"/blog"}
              className="text-gray-800 hover:text-indigo-600 focus:text-indigo-600 transition-colors"
            >
              Blog
            </NavLink>
            <NavLink
              to={"/contact"}
              className="text-gray-800 hover:text-indigo-600 focus:text-indigo-600 transition-colors"
            >
              Contact
            </NavLink>
            <NavLink
              to={"/about"}
              className="text-gray-800 hover:text-indigo-600 focus:text-indigo-600 transition-colors"
            >
              About us
            </NavLink>
          </nav>
        </div>

        <div className="relative w-full flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-gray-200 pt-4 mt-4">
          <div className="text-center md:text-left text-sm md:text-base text-gray-500">
            <p>
              &copy; {currentYear}
              <a
                href="https://www.github.com/joesef127/"
                className="text-[#FF7967]"
              >
                {" "}
                AdeDev Solutions.
              </a>{" "}
              All Rights Reserved.
            </p>
          </div>

          <div className="flex justify-center md:justify-end sm:absolute sm:right-0">
            <SocialMediaBox />
          </div>
        </div>
      </div>
    </footer>
  );
}
