import { useState, useEffect } from "react";
import { Button, Heading, LoadingSpinner, SubHeading } from "../utils/Utils";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../utils/Pagination";
import { RecipeType } from "../utils/Types";
import SelectDropdown from "../utils/SelectDropdown";
import useRecipe from "../hooks/useRecipe";
import EditRecipeForm from "../components/EditRecipe";
import AddRecipeForm from "../components/AddRecipe";
import { useGlobalContext } from "../GlobalContext";
import useAOS from "../hooks/useAOS";

export default function Recipes() {
  const { role } = useGlobalContext();
  useAOS({
    duration: 500,
    easing: "ease-in-out",
  });

  const {
    recipeData,
    isLoading,
    error,
    toggleFavorite,
    editRecipe,
    deleteRecipe,
    addRecipe,
  } = useRecipe();

  const [filteredRecipes, setFilteredRecipes] = useState<RecipeType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTime, setSelectedTime] = useState<string>("all");
  const [selectedSearch, setSelectedSearch] = useState<string>("");
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const recipesPerPage = 8;

  useEffect(() => {
    const filtered = recipeData.filter((recipe) => {
      const matchesFavorites = !showFavorites || recipe.isFavorite;
      const matchesCategory =
        selectedCategory === "all" ||
        recipe.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesTime =
        selectedTime === "all" ||
        (selectedTime === "<30mins" && recipe.time < 30) ||
        (selectedTime === "<60mins" && recipe.time < 60) ||
        (selectedTime === "<90mins" && recipe.time < 90) ||
        (selectedTime === "<120mins" && recipe.time < 120);
      const matchesSearch =
        selectedSearch === "" ||
        recipe.name.toLowerCase().includes(selectedSearch.toLowerCase());

      return (
        matchesFavorites && matchesCategory && matchesTime && matchesSearch
      );
    });

    setFilteredRecipes(filtered);
    setCurrentPage(1);
  }, [
    selectedCategory,
    selectedTime,
    selectedSearch,
    showFavorites,
    recipeData,
  ]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  function handleOpenEditForm(recipe: RecipeType) {
    setSelectedRecipe(recipe);
    setShowEditForm(true);
  }

  function handleCloseEditForm() {
    setSelectedRecipe(null);
    setShowEditForm(false);
  }

  function handleOpenAddForm() {
    setShowAddForm(true);
  }

  function handleCloseAddForm() {
    setShowAddForm(false);
  }

  return (
    <div className="pb-20 overflow-y-scroll relative inter">
      <section className="relative flex justify-center items-center mt-10 gap-20">
        <div className="w-[95%] sm:w-[90%] flex flex-col justify-center items-center gap-5">
          <div className="flex flex-col justify-between items-center">
            <Heading text="Recipes" customClass="text-center mb-4" animation="fade-left" />
            <SubHeading
              text="Here is a list of all the recipes we have to offer. Use the filters below to find your favorite recipes."
              customClass="text-center text-gray-500 mb-8" animation="fade-right"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full" data-aos="fade-up" data-aos-delay="100">
            <input
              type="text"
              placeholder="Search for a recipe..."
              value={selectedSearch}
              onChange={(e) => setSelectedSearch(e.target.value)}
              className="w-full sm:w-[50%] rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="w-full flex flex-col sm:flex-row sm:justify-center sm:items-baseline gap-4 sm:gap-8">
            <div className="flex flex-col" data-aos="fade-right" data-aos-delay="200">
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

            <div className="flex flex-col" data-aos="fade-up" data-aos-delay="200">
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

            <div className="flex flex-col" data-aos="fade-left" data-aos-delay="200">
              <h5 className={`block `}>Filter by favorites</h5>
              <button
                className={`flex gap-2.5 justify-between items-center w-full cursor-default rounded bg-white text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-xs sm:text-sm py-2 px-1 lg:py-4 lg:px-3 mt-2`}
                onClick={() => setShowFavorites(!showFavorites)}
              >
                {showFavorites ? "Show All Recipes" : "Show Favorites"}
              </button>
            </div>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : currentRecipes.length > 0 ? (
            <div className="flex flex-col justify-center items-center">
              {role === "admin" && (
                <Button
                  text={"Add New Recipe"}
                  customFunction={handleOpenAddForm}
                />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl gap-2.5 mt-10">
                {currentRecipes.map((recipe) => (
                  <RecipeCard
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
                    bgColor="#E7FAFE"
                    animation={recipe.id && recipe.id % 2 === 0 ? "fade-up" : "fade-down"}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="col-span-full text-center text-gray-500">
              <p>No recipes found. Try adjusting your filters.</p>
            </div>
          )}

          {filteredRecipes.length > recipesPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </section>

      {showEditForm && (
        <EditRecipeForm
          handleForm={handleCloseEditForm}
          editRecipe={editRecipe}
          initialRecipe={selectedRecipe}
        />
      )}

      {showAddForm && (
        <AddRecipeForm
          AddRecipe={async (recipe) => {
            await addRecipe(recipe);
            handleCloseAddForm();
          }}
          handleForm={handleCloseAddForm}
        />
      )}
    </div>
  );
}

const categoryOptions = [
  { id: "all", name: "All Categories" },
  { id: "breakfast", name: "Breakfast" },
  { id: "snack", name: "Snack" },
  { id: "seafood", name: "Seafood" },
  { id: "italian", name: "Italian" },
  { id: "salad", name: "Salad" },
  { id: "appetizer", name: "Appetizer" },
  { id: "dessert", name: "Dessert" },
  { id: "asian", name: "Asian" },
  { id: "mexican", name: "Mexican" },
  { id: "vegan", name: "Vegan" },
  { id: "healthy", name: "Healthy" },
  { id: "meat", name: "Meat" },
  { id: "noodles", name: "Noodles" },
  { id: "sweet", name: "Sweet" },
  { id: "western", name: "Western" },
  { id: "japanese", name: "Japanese" },
];

const timeOptions = [
  { id: "all", name: "All Times" },
  { id: "<30mins", name: "Less than 30 mins" },
  { id: "<60mins", name: "Less than 60 mins" },
  { id: "<90mins", name: "Less than 90 mins" },
  { id: "<120mins", name: "Less than 120 mins" },
];
