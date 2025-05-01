import SocialMediaBox from "./SocialMediaBox";
import foodieland_logo from "../assets/foodieland_logo.png";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const currentYear: number = new Date().getFullYear();
  return (
    <div className="flex flex-col justify-center items-center relative bottom-0 w-full bg-white">
      <div className="w-full flex justify-center items-center max-w-[1440px]">
        <div className="w-[90%] flex flex-wrap gap-2.5 justify-between items-baseline-last">
          <div className="flex flex-col flex-wrap justify-start gap-4">
            <figure>
              <img src={foodieland_logo} alt="foodieland" className="w-28" />
            </figure>
            <p className="text-lg text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <nav className="flex gap-8">
              <NavLink to={"/recipes"}>Recipes</NavLink>
              <NavLink to={"/blog"}>Blog</NavLink>
              <NavLink to={"/contact"}>Contact</NavLink>
              <NavLink to={"/about"}>About us</NavLink>
            </nav>
          </div>
        </div>
      </div>
      
      <div className="w-[90%] py-8 mt-5 border-t border-gray-200 flex justify-center items-center public-sans relative max-w-[1440px]">
        <div className="flex gap-1 text-lg">
          <p className="text-gray-500">&copy; {currentYear} Flowbase.</p>
          <p className="text-gray-500">
            Powered by <span className="text-[#FF7967]">Webflow</span>
          </p>
        </div>
        <div className="absolute right-0">
          <SocialMediaBox />
        </div>
      </div>
    </div>
  );
}
