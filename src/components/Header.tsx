import { NavLink } from "react-router-dom";
import foodieland_logo from "../assets/foodieland_logo.png";
import SocialMediaBox from "./SocialMediaBox";

export default function Header() {
  return (
    <div className="py-10 flex justify-center items-center border-b-1 border-gray-200 sticky top-0 z-[999] backdrop-blur-3xl inter">
      <div className="flex justify-between items-center w-[90%] max-w-[1440px]">
        <figure>
          <img src={foodieland_logo} alt="foodieland" className="w-28" />
        </figure>
        <nav className="flex gap-8">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/recipes"}>Recipes</NavLink>
          <NavLink to={"/blog"}>Blog</NavLink>
          <NavLink to={"/contact"}>Contact</NavLink>
          <NavLink to={"/about"}>About us</NavLink>
        </nav>
        <div>
          <SocialMediaBox />
        </div>
      </div>
    </div>
  );
}
