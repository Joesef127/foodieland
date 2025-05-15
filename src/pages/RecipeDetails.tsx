import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RecipeType } from "../utils/Types";
import { LoadingSpinner, Heading } from "../utils/Utils";
import printer from "../assets/icons/printer.svg";
import share from "../assets/icons/share.svg";

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
      <section className="relative flex justify-center items-center mt-10 gap-20">
        <div className="w-[95%] sm:w-[90%] flex flex-col justify-center items-center gap-5">
          <div>
          <div className="flex flex-col justify-between items-center">
            <Heading text={recipe.name} customClass="text-center mb-4" />
            <div>
              
            </div>
          </div>
          <div>
            <div><img src={printer} alt="print" /></div>
            <div><img src={share} alt="print" /></div>
          </div>
          </div>

          <div></div>
        </div>
      </section>
    </div>
  );
}
