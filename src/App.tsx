import { useState } from "react";
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
import community_bg from "./assets/images/community_bg.png";
import {
  Button,
  CategoryItem,
  Heading,
  LoadingSpinner,
  StickyObject,
  SubHeading,
} from "./utils/Utils";

import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Recipe from "./components/RecipeCard";
import { RecipeType } from "./utils/Types";
import Newsletter from "./components/Newsletter";
import { useEffect } from "react";
import AddRecipeForm from "./components/AddRecipe";
import EditRecipeForm from "./components/EditRecipe";
import { heroSlides } from "./utils/HeroSlidesData";

function App() {
  const [recipeData, setRecipeData] = useState<RecipeType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);

  // const slides = [1, 2, 3, 4, 5];
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

  useEffect(() => {
    fetchRecipe();
  }, []);

  function handleOpenAddForm() {
    return setShowAddForm(true);
  }

  function handleCloseAddForm() {
    return setShowAddForm(false);
  }

  function handleOpenEditForm(recipe: RecipeType) {
    setSelectedRecipe(recipe);
    setShowEditForm(true);
  }

  function handleCloseEditForm() {
    setSelectedRecipe(null);
    setShowEditForm(false);
  }

  const fetchRecipe = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:8000/recipes/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: RecipeType[] = await response.json();
      setRecipeData(data);
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  async function AddRecipe(recipe: RecipeType) {
    try {
      const res = await fetch(`http://localhost:8000/recipes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      if (res.ok) {
        console.log("Recipe added successfully");
        const createdRecipe = await res.json();
        setRecipeData((prevData) => [...prevData, createdRecipe]);
        fetchRecipe();
      } else if (res.status === 422) {
        const errorData = await res.json();
        if (errorData.errors) {
          console.error("Validation errors:", errorData.errors);
        } else {
          console.error("Error adding recipe:", errorData);
        }
      } else if (res.status === 500) {
        console.error("Server error while adding recipe");
      }
    } catch (error) {
      console.error("Network error while adding recipe:", error);
    }
  }

  async function handleEditRecipe(id: number | undefined, recipe: RecipeType) {
    try {
      const res = await fetch(`http://localhost:8000/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });
      if (res.ok) {
        console.log(`Recipe with ID ${id} edited successfully`);
        const updatedRecipeData = await res.json();
        setRecipeData((prevData) =>
          prevData.map((recipe) =>
            recipe.id === id ? updatedRecipeData : recipe
          )
        );
        fetchRecipe();
      } else if (res.status === 404) {
        console.error(`Recipe with ID ${id} not found`);
      } else if (res.status === 500) {
        console.error("Server error while editing recipe");
      } else {
        const errorData = await res.json();
        console.error("Error editing recipe:", errorData);
      }
    } catch (error) {
      console.error("Network error while editing recipe:", error);
    }
  }

  async function handleDeleteRecipe(id: number | undefined) {
    try {
      const res = await fetch(`http://localhost:8000/recipes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log(`Recipe with ID ${id} deleted successfully`);
        setRecipeData((prevData) =>
          prevData.filter((recipe) => recipe.id !== id)
        );
        fetchRecipe();
      } else if (res.status === 404) {
        console.error(`Recipe with ID ${id} not found`);
      } else if (res.status === 500) {
        console.error("Server error while deleting recipe");
      } else {
        const errorData = await res.json();
        console.error("Error deleting recipe:", errorData);
      }
    } catch (error) {
      console.error("Network error while deleting recipe:", error);
    }
  }

  async function handleToggleFavorite(id: number | undefined) {
    try {
      const res = await fetch(
        `http://localhost:8000/recipes/${id}/toggle_favorite`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        console.log(
          `Recipe with ID ${id} favorite status toggled successfully`
        );
        const updatedRecipe = await res.json();
        setRecipeData((prevData) =>
          prevData.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))
        );
        console.log(`updatedRecipe: ${updatedRecipe.isFavorite}`);
        fetchRecipe();
      } else if (res.status === 404) {
        console.error(`Recipe with ID ${id} not found`);
      } else if (res.status === 500) {
        console.error("Server error while toggling favorite status");
      } else {
        const errorData = await res.json();
        console.error("Error toggling favorite status:", errorData);
      }
    } catch (error) {
      console.error("Network error while toggling favorite status:", error);
    }
  }

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
            {heroSlides &&
              heroSlides.map((slide, index: number) => (
                <SwiperSlide key={index}>
                  <HeroSlide
                    title={slide.title}
                    description={slide.description}
                    badges={slide.badges}
                    user={slide.user}
                    backgroundImage={slide.backgroundImage}
                    button={slide.button}
                  />
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-6">
            {categories &&
              categories.map((category, index) => (
                <CategoryItem
                  key={index}
                  image={category.image}
                  name={category.name}
                  bgColor={category.bgColor}
                />
              ))}
          </div>
        </div>
      </section>

      <section className="relative flex justify-center items-center mt-40 gap-20">
        <div className="w-[95%] sm:w-[90%] flex flex-col justify-center items-center gap-18">
          <div className="flex flex-col justify-between items-center">
            <Heading text="Simple and tasty recipes" customClass="mb-6" />
            <SubHeading
              text="Explore a variety of delicious recipes that we offer. We have a
            variety of recipes that are easy to make and delicious to eat."
              customClass="text-center text-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl">
            {isLoading && <LoadingSpinner />}
            {recipeData &&
              recipeData
                .slice(0, 9)
                .map((recipe: RecipeType) => (
                  <Recipe
                    key={recipe.id}
                    image={recipe.image}
                    name={recipe.name}
                    time={recipe.time}
                    category={recipe.category}
                    isFavorite={recipe.isFavorite}
                    handleDeleteRecipe={() => handleDeleteRecipe(recipe.id)}
                    handleOpenEditForm={() => handleOpenEditForm(recipe)}
                    handleToggleFavorite={() => handleToggleFavorite(recipe.id)}
                    customClass="p-2.5"
                  />
                ))}
          </div>
          <Button text={"Add Recipe"} customFunction={handleOpenAddForm} />
        </div>

        {showAddForm && (
          <div className="absolute p-10 bg-white h-fit flex justify-center items-center rounded-2xl shadow-2xl">
            <AddRecipeForm
              AddRecipe={AddRecipe}
              handleForm={handleCloseAddForm}
            />
          </div>
        )}
        {showEditForm && (
          <div className="absolute p-10 bg-white h-fit flex justify-center items-center rounded-2xl shadow-2xl">
            <EditRecipeForm
              editRecipe={handleEditRecipe}
              handleForm={handleCloseEditForm}
              initialRecipe={selectedRecipe}
            />
          </div>
        )}
      </section>

      <section className="w-full flex justify-center items-center mt-36 mb-40">
        <div className="w-[95%] sm:w-[90%] flex flex-col sm:flex-row justify-between items-center gap-20">
          <div className="w-full sm:w-1/2 flex flex-col justify-center items-start gap-8 sm:gap-12 md:gap-14 lg:gap-18">
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
            className="w-11/12 sm:w-1/2 relative rounded-3xl shadow-md flex justify-center items-center"
            style={{
              background: "linear-gradient(to bottom, white, #EDFAFD)",
            }}
          >
            <img
              src={happy_chef}
              alt="Happy chef with fruits"
              className="-ml-28"
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
            />
            <SubHeading
              text="Join our community of food lovers and share your favorite recipes
            with us. We can't wait to see what you create!"
              customClass="text-center text-white max-w-5/6"
            />
          </div>

          <div className="flex justify-center items-center mt-10 z-10">
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
                  <div key={index}>
                    <img
                      src={post.image}
                      alt={post.name}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-5 sm:gap-20">
            <Heading
              text="Try this delicious recipe to make your day"
              customClass="w-full"
            />
            <SubHeading
              text="Discover new flavors and enjoy cooking with our easy-to-follow recipes. 
                  Whether you're a beginner or an experienced chef, our recipes are designed 
                  to inspire creativity in the kitchen."
              customClass="w-full text-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl gap-0 mt-10">
            {isLoading && <div>loading...</div>}
            {recipeData &&
              recipeData
                .slice(0, 8)
                .map((recipe: RecipeType) => (
                  <Recipe
                    key={recipe.id}
                    image={recipe.image}
                    name={recipe.name}
                    time={recipe.time}
                    category={recipe.category}
                    isFavorite={recipe.isFavorite}
                    handleDeleteRecipe={() => handleDeleteRecipe(recipe.id)}
                    handleOpenEditForm={() => handleOpenEditForm(recipe)}
                    handleToggleFavorite={() => handleToggleFavorite(recipe.id)}
                    customClass="p-2.5"
                  />
                ))}
          </div>
        </div>
      </section>

      <section>
        <Newsletter />
      </section>
    </div>
  );
}

export default App;
