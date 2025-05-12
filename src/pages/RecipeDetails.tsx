import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RecipeType } from "../utils/Types";
import { LoadingSpinner, Heading, SubHeading } from "../utils/Utils";

export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>(); 
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:8000/recipes/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch recipe details");
        }
        const data: RecipeType = await res.json();
        setRecipe(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "An error occurred while fetching recipe details");
        } else {
          setError("An unknown error occurred while fetching recipe details");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Recipe not found.
      </div>
    );
  }

  return (
    <div className="pb-20 overflow-y-scroll relative inter">
      <section className="relative flex flex-col items-center mt-10 gap-10">
        <Heading text={recipe.name} customClass="text-center" />
        <img
          src={recipe.image}
          alt={recipe.name}
          className="rounded-lg shadow-md w-full max-w-64"
        />
        <div className="w-[95%] sm:w-[90%] lg:w-[70%] flex flex-col gap-5">
          <SubHeading text="Details" customClass="text-gray-700" />
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-gray-200 rounded-md text-sm">
              Category: {recipe.category}
            </span>
            <span className="px-4 py-2 bg-gray-200 rounded-md text-sm">
              Cooking Time: {recipe.time} mins
            </span>
            <span className="px-4 py-2 bg-gray-200 rounded-md text-sm">
              Favorite: {recipe.isFavorite ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
