// import { useState, useEffect, useCallback } from "react";
// import { Link } from "react-router-dom";
// import useRecipe from "../utils/useRecipe";

// import { RecipeType } from "../utils/Types";
import {
  Button,
  Heading,
  LoadingSpinner,
  // UserBox,
  // Badge,
  // LoadingSpinner,
  // ShuffleArray,
  SubHeading,
  // OutputIcon,
} from "../utils/Utils";

import Newsletter from "../components/Newsletter";
// import RecipeShortList from "../utils/RecipeShortList";
// import ItemsList from "../components/ItemsList";

// import printer from "../assets/icons/printer.svg";
// import share from "../assets/icons/share.svg";
// import user_dp from "../assets/images/user_dp.png";
// import Timer from "../assets/icons/Timer.svg";
// import ForkKnife from "../assets/icons/ForkKnife.svg";
import BlogCard from "../components/BlogCard";
import Pagination from "../utils/Pagination";
import { useEffect, useState } from "react";
import { mockBlogPosts } from "../utils/MockBlogPosts";
import { BlogCardProps } from "../utils/Types";
import GreenCard from "../components/GreenCard";
import RecipeSideList from "../utils/RecipeSideList";
import AddBlog from "../components/AddBlog";

export default function RecipeDetails() {
  // const { id } = useParams<{ id: string }>();
  // const [recipe, setRecipe] = useState<RecipeType | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  // const fetchRecipeDetails = useCallback(async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await fetch(`http://localhost:8000/recipes/${id}`);
  //     if (!res.ok) {
  //       throw new Error("Failed to fetch recipe details");
  //     }
  //     const data: RecipeType = await res.json();
  //     setRecipe(data);
  //   } catch (err: unknown) {
  //     if (err instanceof Error) {
  //       setError(
  //         err.message || "An error occurred while fetching recipe details"
  //       );
  //     } else {
  //       setError("An unknown error occurred while fetching recipe details");
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [id]);

  // useEffect(() => {
  //   fetchRecipeDetails();
  // }, [fetchRecipeDetails]);

  // if (error) {
  //   return (
  //     <div className="flex flex-col justify-center items-center h-screen text-red-500">
  //       <p>{error}</p>o
  //     </div>
  //   );
  // }
  // if (isLoading) {
  //   <LoadingSpinner />;
  // }
  const [blogPosts, setBlogPosts] = useState<BlogCardProps[]>([]);
  const [showAddBlog, setShowAddBlog] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const postsPerPage = 8;

  useEffect(() => {
    setIsLoading(true);
    //   // Fetch blog posts from the API or database
    //   const fetchBlogPosts = async () => {
    //     const res = await fetch("http://localhost:8000/blogPosts");
    //     const data = await res.json();
    //     setBlogPosts(data);
    //   };

    //   fetchBlogPosts();
    setBlogPosts(mockBlogPosts);
    setIsLoading(false)
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // const { recipeData } = useRecipe();

  // const randomRecipes = ShuffleArray(recipeData).slice(0, 3);

  const addBlog = async (newBlog: {
    title: string;
    excerpt: string;
    date: string;
    content: string;
  }) => {
    try {
      // Simulate saving to a database or API
      const updatedBlogs = [
        ...blogPosts,
        { id: blogPosts.length + 1, ...newBlog },
      ];
      setBlogPosts(updatedBlogs); // Update the state with the new blog
      console.log("Blog added successfully:", newBlog);
    } catch (error) {
      console.error("Failed to add blog:", error);
    }
  };

  // Handle opening the add modal
  function handleOpenAddBlog() {
    setShowAddBlog(true);
  }

  // Handle closing the add modal
  function handleCloseAddBlog() {
    setShowAddBlog(false);
  }

  return (
    <>
      <div className="pb-20 overflow-y-scroll relative inter">
        {/* <section className="relative flex justify-center items-center mt-10 gap-20">
          <div className="w-[95%] sm:w-[90%] flex flex-col justify-center items-center gap-5">
            <div className="w-full flex flex-col sm:grid sm:grid-cols-4 md:grid-cols-3 justify-between gap-4 md:gap-6">
              <div className="relative flex flex-col w-full col-span-3 sm:col-span-3 md:col-span-2 gap-6">
                <Heading text={recipe.name} customClass="mb-4 " />
                <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-2 md:gap-4 w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-1 sm:gap-4 w-full">
                    <UserBox
                      userPic={user_dp}
                      customStyle="lg:pr-6 flex-row sm:justify-start justify-center items-center sm:border-b sm:border-b-0 border-black/20"
                    />

                    <div className="flex sm:hidden justify-center items-center gap-2 sm:gap-4 md:gap-5 lg:gap-6 sm:border-b border-black/20 py-1">
                      <OutputIcon icon={printer} title="PRINT" />
                      <OutputIcon icon={share} title="SHARE" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 col-span-2 items-center">
                    <div className="flex justify-center sm:justify-start items-center py-1 sm:border-b-0 sm:border-l rounded-none border-black/20">
                      <Badge
                        icon={Timer}
                        text="COOK TIME"
                        fontWeight="medium"
                        time={`${recipe.time} minutes`}
                        customClass="gap-4 text-xs md:text-sm px-0"
                      />
                    </div>
                    <div className="flex justify-center sm:justify-start items-center h-full py-1 sm:border-l rounded-none border-black/20">
                      <Badge
                        icon={ForkKnife}
                        text={recipe.category}
                        fontWeight="normal"
                        customClass="gap-4 text-xs md:text-sm px-0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex sm:justify-end items-center gap-2 sm:gap-4 md:gap-5 lg:gap-6">
                <OutputIcon icon={printer} title="PRINT" />
                <OutputIcon icon={share} title="SHARE" />
              </div>
            </div>

            <div className="w-full grid md:grid-cols-2 justify-center lg:justify-between gap-6 md:gap-4 lg:gap-6 mt-12">
              <div className="md:col-span-1 w-full overflow-hidden rounded-3xl">
                <img
                  src={recipe.image}
                  alt="recipe image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-4 lg:p-6 bg-[#E7FAFE] rounded-3xl flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-3  lg:gap-6 ">
                  <h2 className="font-bold text-base md:text-lg lg:text-2xl">
                    Nutrition Information
                  </h2>
                  <ul className="flex flex-col gap-2 lg:gap-4">
                    {recipe.nutritionInfo?.map((info, index) => {
                      return (
                        <li
                          key={index}
                          className="flex justify-between items-center pb-2 border-b border-b-black/10 text-xs sm:text-sm md:text-base lg:text-lg font-regular gap-6"
                        >
                          <span>{info.name}</span>
                          <span className="font-medium">{info.measure}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <p className="text-xs sm:text-sm lg:text-base">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Culpa placeat vitae.
                </p>
              </div>
            </div>
            <p className="mt-2 sm:mt-4 lg:mt-6 text-black/60 text-xs sm:text-sm md:text-base">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex et ab
              veniam perferendis recusandae eveniet modi debitis non aspernatur.
              Aliquid tenetur ducimus voluptatem iure maxime, vitae placeat
              blanditiis beatae porro. Accusamus, dolores. Magnam explicabo ipsa
              placeat qui molestias modi a alias facilis voluptatibus libero at
              repellendus impedit consectetur tempore, magni aut est!
            </p>
          </div>
        </section> */}

        <section className="relative flex justify-center items-center mt-10 gap-20">
          <div className="w-[95%] sm:w-[90%] flex flex-col justify-center items-center gap-5">
            {/* <div className="w-full flex flex-col sm:grid sm:grid-cols-4 md:grid-cols-3 justify-between gap-4 md:gap-6"> */}
            <div className="relative flex flex-col justify-center items-center w-full col-span-3 sm:col-span-3 md:col-span-2">
              <Heading text="Blog Posts" customClass="mb-4 text-center" />
              <SubHeading
                text="Discover the latest articles, tips, and stories from our blog."
                customClass="text-center text-black/60"
              />
            </div>
            {/* </div> */}
            <Button
              text={"Add New Blog"}
              customFunction={handleOpenAddBlog}
              customClass="mt-10"
            />
          </div>
        </section>

        <section className="flex justify-center items-center mt-20">
          <div className="w-[95%] sm:w-[90%] grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="flex flex-col gap-10 col-span-1 lg:col-span-2">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                currentPosts.map((post, index) => (
                  <BlogCard
                    id={post.id}
                    author={post.author}
                    date={post.date}
                    excerpt={post.excerpt}
                    image={post.image}
                    title={post.title}
                    key={index}
                  />
                ))
              )}

              <section className="w-full flex lg:hidden justify-center items-center mt-10">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(blogPosts.length / postsPerPage)}
                  onPageChange={(page) => setCurrentPage(page)}
                  customStyle=""
                />
              </section>
            </div>
            <div className="col-span-1 grid md:items-center md:grid-cols-2 lg:grid-cols-1 gap-16 w-full h-fit">
              <div className="w-full">
                <Heading text="Other Recipes" />
                <RecipeSideList />
              </div>
              <GreenCard />
            </div>
          </div>
        </section>

        <section className="hidden w-full lg:flex justify-center items-center mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(blogPosts.length / postsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
            customStyle="w-fit w-[95%] sm:w-[90%]"
          />
        </section>

        <div className="my-20">
          <Newsletter />
        </div>

        {showAddBlog && (
          <AddBlog handleForm={handleCloseAddBlog} addBlog={addBlog} />
        )}

        {/* <div className="mt-10 sm:mt-20 md:mt-30 lg:mt-40">
          <RecipeShortList headingText="You may like these recipe too" />
        </div> */}
      </div>
    </>
  );
}
