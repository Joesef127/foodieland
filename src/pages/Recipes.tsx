import { useState, useEffect } from "react";
import { Heading, LoadingSpinner, SubHeading } from "../utils/Utils";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../utils/Pagination"; // Import the Pagination component
import { RecipeType } from "../utils/Types";
import SelectDropdown from "../utils/SelectDropdown";

export default function Recipes() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTime, setSelectedTime] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recipesPerPage = 8; // Number of recipes per page

  // Fetch recipes from the backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:8000/recipes");
        if (!res.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data: RecipeType[] = await res.json();
        setRecipes(data);
        setFilteredRecipes(data); // Initialize filtered recipes
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "An error occurred while fetching recipes");
        } else {
          setError("An unknown error occurred while fetching recipes");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Filter recipes whenever filters change
  useEffect(() => {
    const filtered = recipes.filter((recipe) => {
      const matchesCategory =
        selectedCategory === "all" || recipe.category === selectedCategory;
      const matchesTime =
        selectedTime === "all" ||
        (selectedTime === "<30mins" && recipe.time < 30) ||
        (selectedTime === "<60mins" && recipe.time < 60) ||
        (selectedTime === "<90mins" && recipe.time < 90) ||
        (selectedTime === "<120mins" && recipe.time < 120);

      return matchesCategory && matchesTime;
    });

    setFilteredRecipes(filtered);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [selectedCategory, selectedTime, recipes]);

  // Pagination logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  return (
    <div className="pb-20 overflow-y-scroll relative inter">
      <section className="relative flex justify-center items-center mt-10 gap-20">
        <div className="w-[95%] sm:w-[90%] flex flex-col justify-center items-center gap-5">
          <div className="flex flex-col justify-between items-center">
            <Heading text="Recipes" customClass="text-center mb-4" />
            <SubHeading
              text="Here is a list of all the recipes we have to offer. Use the filters below to find your favorite recipes."
              customClass="text-center text-gray-500 mb-8"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex flex-col">
              <SelectDropdown
                label="Filter by Category"
                options={categoryOptions}
                selected={
                  categoryOptions.find(
                    (option) => option.id === selectedCategory
                  ) || categoryOptions[0]
                }
                onChange={(option) => setSelectedCategory(option.id as string)}
              />
            </div>

            <div className="flex flex-col">
              <SelectDropdown
                label="Filter by Cooking Time"
                options={timeOptions}
                selected={
                  timeOptions.find((option) => option.id === selectedTime) ||
                  timeOptions[0]
                }
                onChange={(option) => setSelectedTime(option.id as string)}
              />
            </div>
          </div>

          {/* Recipes List */}
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : currentRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl gap-2.5 mt-10">
              {currentRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  image={recipe.image}
                  name={recipe.name}
                  time={recipe.time}
                  category={recipe.category}
                  isFavorite={recipe.isFavorite}
                  bgColor="#E7FAFE"
                />
              ))}
            </div>
          ) : (
            <div className="col-span-full text-center text-gray-500">
              <p>No recipes found. Try adjusting your filters.</p>
            </div>
          )}

          {/* Pagination */}
          {filteredRecipes.length > recipesPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </section>
    </div>
  );
}

const categoryOptions = [
  { id: "all", name: "All Categories" },
  { id: "breakfast", name: "Breakfast" },
  { id: "snack", name: "Snack" },
  { id: "healthy", name: "Healthy" },
  { id: "meat", name: "Meat" },
  { id: "noodles", name: "Noodles" },
  { id: "sweet", name: "Sweet" },
  { id: "western", name: "Western" },
  { id: "eastern", name: "Eastern" },
  { id: "japanese", name: "Japanese" },
  { id: "seafood", name: "Seafood" },
];

const timeOptions = [
  { id: "all", name: "All Times" },
  { id: "<30mins", name: "Less than 30 mins" },
  { id: "<60mins", name: "Less than 60 mins" },
  { id: "<90mins", name: "Less than 90 mins" },
  { id: "<120mins", name: "Less than 120 mins" },
];
