import { Heading, SubHeading } from "../utils/Utils";
import smiling_chef from "../assets/images/smiling_chef.png";
import lady_cooking from "../assets/images/lady_cooking.png";
import happy_chef from "../assets/images/happy_chef.png";

export default function About() {
  return (
    <div className="pb-20 overflow-y-scroll relative inter">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-20">
        <div className="w-[95%] sm:w-[90%] mx-auto flex flex-col items-center gap-6">
          <Heading text="About Us" customClass="text-center text-white" />
          <SubHeading
            text="Discover the story behind Foodieland and our passion for food."
            customClass="text-center text-gray-200 max-w-3xl"
          />
          <img
            src={smiling_chef}
            alt="Smiling Chef"
            className="rounded-lg shadow-lg max-w-full sm:max-w-2xl mt-10"
          />
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-[95%] sm:w-[90%] mx-auto flex flex-col gap-10">
          <Heading text="Who We Are" customClass="text-center text-gray-800" />
          <p className="text-gray-600 text-center leading-relaxed max-w-4xl mx-auto">
            At Foodieland, we are passionate about bringing people together
            through the love of food. Our platform is dedicated to providing
            easy-to-follow recipes, cooking tips, and a community for food
            enthusiasts to share their culinary creations. Whether you're a
            seasoned chef or just starting your cooking journey, Foodieland is
            here to inspire and guide you every step of the way.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-white">
        <div className="w-[95%] sm:w-[90%] mx-auto flex flex-col gap-10">
          <Heading text="Our Mission" customClass="text-center text-gray-800" />
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <img
              src={happy_chef}
              alt="Cooking Class"
              className="rounded-lg shadow-md max-w-full sm:max-w-md"
            />
            <p className="text-gray-600 text-center lg:text-left leading-relaxed max-w-4xl">
              Our mission is to make cooking accessible, enjoyable, and
              rewarding. We aim to empower individuals to explore their
              creativity in the kitchen by providing them with the tools and
              resources they need to succeed. From quick and easy meals to
              gourmet dishes, Foodieland is your go-to destination for all
              things food.
            </p>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-[95%] sm:w-[90%] mx-auto flex flex-col gap-10">
          <Heading text="Our Vision" customClass="text-center text-gray-800" />
          <p className="text-gray-600 text-center leading-relaxed max-w-4xl mx-auto">
            We envision a world where everyone can experience the joy of
            cooking and the satisfaction of creating delicious meals. By
            fostering a global community of food lovers, we hope to inspire
            meaningful connections and celebrate the diversity of culinary
            traditions from around the world.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-white">
        <div className="w-[95%] sm:w-[90%] mx-auto flex flex-col gap-10">
          <Heading text="Meet Our Team" customClass="text-center text-gray-800" />
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <img
              src={lady_cooking}
              alt="Our Team"
              className="rounded-lg shadow-md max-w-full sm:max-w-md"
            />
            <p className="text-gray-600 text-center lg:text-left leading-relaxed max-w-4xl">
              Our team is made up of passionate food enthusiasts, chefs, and
              developers who are dedicated to making Foodieland the best
              platform for food lovers. We work tirelessly to bring you the
              best recipes, tips, and tools to enhance your cooking experience.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
        <div className="w-[95%] sm:w-[90%] mx-auto flex flex-col items-center gap-10">
          <Heading text="Join Our Community" customClass="text-center text-white" />
          <SubHeading
            text="Become a part of our growing community of food lovers. Share your recipes, learn from others, and celebrate the joy of cooking together."
            customClass="text-center text-gray-200 max-w-4xl"
          />
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-md shadow-md hover:bg-gray-100">
            Join Now
          </button>
        </div>
      </section>
    </div>
  );
}
