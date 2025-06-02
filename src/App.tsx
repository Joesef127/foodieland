import { useState } from "react";

import rice from "./assets/images/rice.png";
import veggies from "./assets/images/veggies.png";
import beef from "./assets/images/beef.png";
import cake from "./assets/images/cake.png";
import chocolate from "./assets/images/chocolate.png";
import bread from "./assets/images/bread.png";
import happy_chef from "./assets/images/happy_chef.png";
import tomato from "./assets/images/tomato.png";
import onion from "./assets/images/onion.png";
import instagram_white from "./assets/icons/instagram_white.svg";
import post1 from "./assets/images/post1.png";
import post2 from "./assets/images/post2.png";
import post3 from "./assets/images/post3.png";
import post4 from "./assets/images/post4.png";
import community_bg from "./assets/images/community_bg.png";

import {
  Button,
  CategoryItem,
  Heading,
  LoadingSpinner,
  StickyObject,
  SubHeading,
} from "./utils/Utils";
import { RecipeType } from "./utils/Types";

import Recipe from "./components/RecipeCard";
import Newsletter from "./components/Newsletter";
import EditRecipeForm from "./components/EditRecipe";
import HeroSection from "./components/HomeHeroSection";

import useRecipe from "./hooks/useRecipe";
import useAOS from "./hooks/useAOS";
function App() {
  useAOS({
    duration: 500,
    easing: "ease-in-out",
  });

  const {
    recipeData,
    isLoading,
    error,
    editRecipe,
    deleteRecipe,
    toggleFavorite,
  } = useRecipe();

  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);

  const categories = [
    { image: rice, name: "Rice", bgColor: "#F7F8F4" },
    { image: veggies, name: "Veggies", bgColor: "#FAFDF8" },
    { image: beef, name: "Beef", bgColor: "#FBECEB" },
    { image: cake, name: "Cake", bgColor: "#FEF7E9" },
    { image: bread, name: "Bread", bgColor: "#F4F4F4" },
    { image: chocolate, name: "Chocolate", bgColor: "#F5F5F5" },
  ];
  const posts = [
    { image: post1, name: "Post 1" },
    { image: post2, name: "Post 2" },
    { image: post3, name: "Post 3" },
    { image: post4, name: "Post 4" },
  ];


  function handleOpenEditForm(recipe: RecipeType) {
    setSelectedRecipe(recipe);
    setShowEditForm(true);
  }

  function handleCloseEditForm() {
    setSelectedRecipe(null);
    setShowEditForm(false);
  }

  return (
    <div className="pt-10 pb-40 overflow-y-scroll overflow-x-hidden relative inter">
      <HeroSection />

      <section className="flex justify-center items-center mt-40">
        <div className="w-[95%] sm:w-[90%] flex flex-col gap-18">
          <div className="flex justify-between items-center mb-10">
            <Heading text="Categories" animation="fade-right" />

            <Button
              text="View All Categories"
              customClass="bg-[#E7FAFE] text-black shadow-md hover:bg-[#D1F1F5]"
              animation="fade-left"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-6">
            {categories &&
              categories.map((category, index) => (
                <CategoryItem
                  key={index}
                  image={category.image}
                  name={category.name}
                  bgColor={category.bgColor}
                  animation={index % 2 === 0 ? "fade-up" : "fade-down"}
                />
              ))}
          </div>
        </div>
      </section>

      <section className="relative flex justify-center items-center mt-40 gap-20">
        <div className="w-[95%] sm:w-[90%] flex flex-col justify-center items-center gap-18">
          <div className="flex flex-col justify-between items-center">
            <Heading
              text="Simple and tasty recipes"
              customClass="mb-6"
              animation="fade-left"
            />
            <SubHeading
              text="Explore a variety of delicious recipes that we offer. We have a
            variety of recipes that are easy to make and delicious to eat."
              customClass="text-center text-gray-500"
              animation="fade-right"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl">
            {isLoading && <LoadingSpinner />}
            {error && <p className="text-red-500">{error}</p>}
            {recipeData &&
              recipeData
                .slice(0, 9)
                .map((recipe: RecipeType) => (
                  <Recipe
                    key={recipe.id}
                    id={recipe.id}
                    image={recipe.image}
                    name={recipe.name}
                    time={recipe.time}
                    category={recipe.category}
                    isFavorite={recipe.isFavorite}
                    handleDeleteItem={() => deleteRecipe(recipe.id)}
                    handleOpenEditForm={() => handleOpenEditForm(recipe)}
                    handleToggleFavorite={() => toggleFavorite(recipe.id)}
                    customClass="p-2.5"
                    bgColor="#E7FAFE"
                    animation={
                      recipe.id && recipe.id % 2 === 0 ? "fade-up" : "fade-down"
                    }
                  />
                ))}
          </div>
        </div>

        {showEditForm && (
          <EditRecipeForm
            editRecipe={async (id, recipe) => {
              await editRecipe(id, recipe);
              handleCloseEditForm();
            }}
            handleForm={handleCloseEditForm}
            initialRecipe={selectedRecipe}
          />
        )}
      </section>

      <section className="w-full flex justify-center items-center mt-36 mb-40">
        <div className="w-[95%] sm:w-[90%] flex flex-col sm:flex-row justify-between items-center gap-20">
          <div className="w-full sm:w-1/2 flex flex-col justify-center items-start gap-8 sm:gap-12 md:gap-14 lg:gap-18">
            <div className="flex flex-col justify-center items-start gap-6">
              <Heading
                text="Everyone can be a chef in their own kitchen"
                customClass="tracking-tight max-w-[90%]"
                animation="fade-left"
              />
              <SubHeading
                text="Explore a variety of delicious recipes that we offer. We have a
            variety of recipes that are easy to make and delicious to eat."
                customClass="max-w-[90%] text-gray-500"
                animation="fade-right"
              />
            </div>

            <Button
              text="Learn More"
              textColor="text-white"
              customClass="bg-black"
              animation="fade-up"
            />
          </div>

          <div
            className="w-11/12 sm:w-1/2 relative rounded-3xl shadow-md flex justify-center items-center"
            style={{
              background: "linear-gradient(to bottom, white, #EDFAFD)",
            }}
            data-aos="fade-left"
          >
            <img
              src={happy_chef}
              alt="Happy chef with fruits"
              className="-ml-12 lg:-ml-28"
              data-aos="fade-left"
              data-aos-delay="300"
            />
            <StickyObject image={tomato} customClass=" bottom-1/5 -left-5" />
            <StickyObject image={beef} customClass="top-1 left-1/10" />
            <StickyObject image={onion} customClass="top-1/6 left-4/6" />
            <StickyObject image={veggies} customClass="top-4/12 left-10/12" />
          </div>
        </div>
      </section>

      <section className="mb-28 flex justify-center items-center">
        <div
          className="relative w-[95%] sm:w-[90%] bg-black flex flex-col justify-center items-center gap-10 rounded-2xl py-14 bg-cover bg-center bg-no-repeat overflow-hidden"
          style={{ backgroundImage: `url(${community_bg})` }}
        >
          <div className="absolute w-full h-full bg-black backdrop-3xl opacity-80"></div>
          <div className="flex flex-col justify-center items-center gap-6 z-10">
            <Heading
              text="Join our community"
              customClass="mb-6 text-white text-center max-w-5/6"
              animation="fade-up"
            />
            <SubHeading
              text="Join our community of food lovers and share your favorite recipes
            with us. We can't wait to see what you create!"
              customClass="text-center text-white max-w-5/6"
              animation="fade-up"
              data-aos-delay="300"
            />
          </div>

          <div className="flex justify-center items-center mt-10 z-10">
            <Button
              text="Join Now"
              textColor="text-black"
              customClass="bg-white"
              animation="fade-up"
              data-aos-delay="500"
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
              animation="fade-right"
            />
            <SubHeading
              text="Follow us on Instagram for the latest updates and recipes. We
              post daily recipes and tips to help you cook like a pro."
              customClass="text-center text-gray-500"
              animation="fade-left"
              data-aos-delay="300"
            />
          </div>
          <div className="  flex flex-col justify-center items-center gap-16">
            <div className="flex flex-wrap justify-center items-center gap-4 w-full">
              {posts &&
                posts.map((post, index) => (
                  <div key={index}>
                    <img
                      src={post.image}
                      alt={post.name}
                      className="rounded-xl shadow-md max-w-64"
                      data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
                      data-aos-delay={index * 100}
                    />
                  </div>
                ))}
            </div>

            <Button
              text="Visit Our Instagram"
              icon={instagram_white}
              textColor="text-white"
              customClass="bg-black"
              animation="fade-up"
            />
          </div>
        </div>
      </section>

      <section className="relative mb-32 flex justify-center items-center">
        <div className="w-[95%] sm:w-[90%] flex flex-col justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-5 sm:gap-20">
            <Heading
              text="Try this delicious recipe to make your day"
              customClass="w-full"
              animation="fade-right"
            />
            <SubHeading
              text="Discover new flavors and enjoy cooking with our easy-to-follow recipes. 
                  Whether you're a beginner or an experienced chef, our recipes are designed 
                  to inspire creativity in the kitchen."
              customClass="w-full text-gray-500"
              animation="fade-left"
              data-aos-delay="300"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl gap-0 mt-10">
            {isLoading && <LoadingSpinner />}
            {recipeData &&
              recipeData
                ?.slice(-8)
                .map((recipe: RecipeType) => (
                  <Recipe
                    key={recipe.id}
                    id={recipe.id}
                    image={recipe.image}
                    name={recipe.name}
                    time={recipe.time}
                    category={recipe.category}
                    isFavorite={recipe.isFavorite}
                    handleDeleteItem={() => deleteRecipe(recipe.id)}
                    handleOpenEditForm={() => handleOpenEditForm(recipe)}
                    handleToggleFavorite={() => toggleFavorite(recipe.id)}
                    customClass="p-2.5"
                    animation={
                      recipe.id && recipe.id % 2 === 0 ? "fade-up" : "fade-down"
                    }
                    data-aos-delay={100}
                  />
                ))}
          </div>
        </div>
      </section>

      <section data-aos="fade-left">
        <Newsletter />
      </section>
    </div>
  );
}

export default App;
