import "./App.css";
import HeroSlide from "./components/HeroSlide";
import { Swiper, SwiperSlide } from "swiper/react";
import rice from "./assets/images/rice.png";
import veggies from "./assets/images/veggies.png";
import beef from "./assets/images/beef.png";
import cake from "./assets/images/cake.png";
import chocolate from "./assets/images/chocolate.png";
import bread from "./assets/images/bread.png";
import happy_chef from "./assets/images/happy_chef.png";
import tomato from "./assets/images/tomato.png";
import onion from "./assets/images/onion.png";
import instagram_white from "./assets/icons/instagram_white.png";
import post1 from "./assets/images/post1.png";
import post2 from "./assets/images/post2.png";
import post3 from "./assets/images/post3.png";
import post4 from "./assets/images/post4.png";
import { Button, CategoryItem, Heading, SubHeading } from "./utils/Utils";

import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Recipe from "./components/RecipeCard";
import { RecipeData, RecipeData2 } from "./utils/RecipeData";
import { RecipeType } from "./utils/Types";
import Newsletter from "./components/Newsletter";

function App() {
  const slides = [1, 2, 3, 4, 5];
  const categories = [
    { image: rice, title: "Rice", bgColor: "#F7F8F4" },
    { image: veggies, title: "Veggies", bgColor: "#FAFDF8" },
    { image: beef, title: "Beef", bgColor: "#FBECEB" },
    { image: cake, title: "Cake", bgColor: "#FEF7E9" },
    { image: bread, title: "Bread", bgColor: "#F4F4F4" },
    { image: chocolate, title: "Chocolate", bgColor: "#F5F5F5" },
  ];
  const posts = [
    { image: post1, title: "Post 1" },
    { image: post2, title: "Post 2" },
    { image: post3, title: "Post 3" },
    { image: post4, title: "Post 4" },
  ];
  return (
    <div className="pt-10 pb-40 overflow-y-scroll relative inter">
      <section className="flex justify-center items-center">
        <div className="w-[95%] sm:w-[90%]">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            loop={true}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            className="mySwiper"
          >
            {slides &&
              slides.map((_, index) => (
                <SwiperSlide key={index}>
                  <HeroSlide />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>

      <section className="flex justify-center items-center mt-40">
        <div className="w-[95%] sm:w-[90%] flex flex-col gap-18">
          <div className="flex justify-between items-center mb-10">
            <Heading text="Categories" />

            <Button
              text="View All Categories"
              customClass="bg-[#E7FAFE] text-black shadow-md hover:bg-[#D1F1F5]"
            />
          </div>

          <div className="flex justify-center items-center flex-wrap gap-6">
            {categories &&
              categories.map((category, index) => (
                <CategoryItem
                  key={index}
                  image={category.image}
                  title={category.title}
                  bgColor={category.bgColor}
                />
              ))}
          </div>
        </div>
      </section>
        
      <section className="flex justify-center items-center mt-40 gap-20">
        <div className="w-[95%] sm:w-[90%] flex flex-col justify-center items-center gap-18">
          <div className="flex flex-col justify-between items-center">
            <Heading text="Simple and tasty recipes" customClass="mb-6" />
            <SubHeading
              text="Explore a variety of delicious recipes that we offer. We have a
              variety of recipes that are easy to make and delicious to eat."
              customClass="text-center text-gray-500"
            />
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 max-w-7xl">
            {RecipeData &&
              RecipeData.map((recipe: RecipeType, index: number) => (
                <Recipe
                  key={index}
                  image={recipe.image}
                  title={recipe.title}
                  time={recipe.time}
                  type={recipe.type}
                  bgColor="#E7F9FD"
                  customClass="shadow-lg"
                />
              ))}
          </div>
        </div>
      </section>

      <section className="w-full flex justify-center items-center mt-36 mb-40">
        <div className="w-[95%] sm:w-[90%] flex flex-col sm:flex-row justify-between items-center gap-20">
          <div className="w-1/2 flex flex-col justify-center items-start gap-18">
            <div className="flex flex-col justify-center items-start gap-6">
              <Heading
                text="Everyone can be a chef in their own kitchen"
                customClass="tracking-tight max-w-[90%]"
              />
              <SubHeading
                text="Explore a variety of delicious recipes that we offer. We have a
              variety of recipes that are easy to make and delicious to eat."
                customClass="max-w-[90%] text-gray-500"
              />
            </div>

            <Button
              text="Learn More"
              textColor="text-white"
              customClass="bg-black"
            />
          </div>

          <div
            className="w-1/2 relative rounded-3xl shadow-md flex justify-center items-center"
            style={{
              background: "linear-gradient(to bottom, white, #EDFAFD)",
            }}
          >
            <img
              src={happy_chef}
              alt="Happy chef with fruits"
              className="-ml-28"
            />
            <span>
              <img
                src={tomato}
                alt="tomato"
                className="absolute bottom-1/5 -left-5 max-w-8 sm:max-w-12"
              />
            </span>
            <span>
              <img
                src={beef}
                alt="beef"
                className="absolute top-1 left-1/5 max-w-8 sm:max-w-12"
              />
            </span>
            <span>
              <img
                src={onion}
                alt="onion"
                className="absolute top-1/6 left-4/6 max-w-8 sm:max-w-12"
              />
            </span>
            <span>
              <img
                src={veggies}
                alt="veggies"
                className="absolute top-4/12 left-10/12 max-w-8 sm:max-w-12"
              />
            </span>
          </div>
        </div>
      </section>

      <section className="mb-28 flex justify-center items-center">
        <div className="w-[95%] sm:w-[90%] bg-black flex flex-col justify-center items-center gap-10 rounded-2xl py-14">
          <div className="flex flex-col justify-center items-center gap-6">
            <Heading text="Join our community" customClass="mb-6 text-white" />
            <SubHeading
              text="Join our community of food lovers and share your favorite recipes
              with us. We can't wait to see what you create!"
              customClass="text-center text-white"
            />
          </div>

          <div className="flex justify-center items-center mt-10">
            <Button
              text="Join Now"
              textColor="text-black"
              customClass="bg-white"
            />
          </div>
        </div>
      </section>

      <section
        className="mb-32 flex justify-center items-center py-18"
        style={{
          background: "linear-gradient(to bottom, white, #E7F9FD)",
        }}
      >
        <div className="w-[95%] sm:w-[90%] flex flex-col justify-center items-center gap-10 rounded-2xl">
          <div className="flex flex-col justify-center items-center gap-6">
            <Heading
              text="Check out @foodieland on Instagram"
              customClass="text-center"
            />
            <SubHeading
              text="Follow us on Instagram for the latest updates and recipes. We
                post daily recipes and tips to help you cook like a pro."
              customClass="text-center text-gray-500"
            />
          </div>
          <div className="  flex flex-col justify-center items-center gap-16">
            <div className="flex flex-wrap justify-center items-center gap-4 w-full">
              {posts &&
                posts.map((post, index) => (
                  <div
                    key={index}
                    // className="w-1/2 sm:w-1/3 lg:w-1/4"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="rounded-xl shadow-md max-w-64"
                    />
                  </div>
                ))}
            </div>

            <Button
              text="Visit Our Instagram"
              icon={instagram_white}
              textColor="text-white"
              customClass="bg-black"
            />
          </div>
        </div>
      </section>

      <section className="mb-32 flex justify-center items-center">
        <div className="w-[95%] sm:w-[90%] flex flex-col justify-center items-center">
          <div className="flex justify-between items-center w-full gap-5">
            <Heading
              text="Try this delicious recipe to make your day"
              customClass="max-w-2/5"
            />
            <SubHeading
              text="Discover new flavors and enjoy cooking with our easy-to-follow recipes. 
                    Whether you're a beginner or an experienced chef, our recipes are designed 
                    to inspire creativity in the kitchen."
              customClass="max-w-3/6 text-gray-500"
            />
          </div>

          <div className="flex flex-wrap justify-center items-center gap-0 mt-20 max-w-7xl">
            
              {RecipeData2 &&
                RecipeData2.map((recipe: RecipeType, index: number) =>
                  // index <= 3 ? (
                    <Recipe
                      key={index}
                      image={recipe.image}
                      title={recipe.title}
                      time={recipe.time}
                      type={recipe.type}
                      customClass="p-0"
                    />
                  // ) : null
                )}
          </div>
        </div>
      </section>
      <Newsletter />
    </div>
    // </div>
  );
}

export default App;
