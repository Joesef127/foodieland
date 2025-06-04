import SocialMediaBox from "./SocialMediaBox";
import foodieland_logo from "../assets/foodieland_logo.svg";
import { NavLink } from "react-router-dom";
import useAOS from "../hooks/useAOS";

export default function Footer() {
  const currentYear: number = new Date().getFullYear();
  useAOS();

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
                data-aos="fade-right"
              />
            </figure>
            <p
              className="text-sm md:text-base text-gray-500 max-w-full"
              data-aos="fade-right"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Discover
              the best recipes and culinary tips.
            </p>
          </div>

          <nav
            className="flex flex-wrap justify-start items-center md:justify-end gap-6 text-sm md:text-base"
            data-aos="fade-left"
          >
            {["recipes", "blog", "contact", "about"].map((nav, index) => {
              return (
                <NavLink
                  key={index}
                  to={`/${nav}`}
                  className="text-gray-800 hover:text-indigo-600 focus:text-indigo-600 transition-colors cursor-pointer capitalize"
                >
                  {nav}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="relative w-full flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-black/30 pt-4 mt-4">
          <div className="text-center md:text-left text-sm md:text-base text-gray-500">
            <p>
              &copy; {currentYear} Created by
              <a
                href="https://www.github.com/joesef127/foodieland"
                className="text-[#FF7967]"
              >
                {" "}
                Joesef127
              </a>
              {". "}
              Figma Design By
              <a
                href="https://www.figma.com/@flowbase"
                className="text-[#FF7967]"
              >
                {" "}
                Flowbase
              </a>
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
