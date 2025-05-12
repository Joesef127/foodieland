import { useState, useEffect } from "react";
import { Button, Heading, LoadingSpinner, SubHeading } from "../utils/Utils";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../utils/Pagination";
import { RecipeType } from "../utils/Types";
import SelectDropdown from "../utils/SelectDropdown";
import useRecipe from "../utils/useRecipe";
import EditRecipeForm from "../components/EditRecipe";
import AddRecipeForm from "../components/AddRecipe";

export default function Recipes() {
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
        selectedCategory === "all" || recipe.category === selectedCategory;
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
    setCurrentPage(1); // Reset to the first page when filters change
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

  // Handle opening the edit modal
  function handleOpenEditForm(recipe: RecipeType) {
    setSelectedRecipe(recipe);
    setShowEditForm(true);
  }

  // Handle closing the edit modal
  function handleCloseEditForm() {
    setSelectedRecipe(null);
    setShowEditForm(false);
  }

  // Handle opening the add modal
  function handleOpenAddForm() {
    setShowAddForm(true);
  }

  // Handle closing the add modal
  function handleCloseAddForm() {
    setShowAddForm(false);
  }

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
          <div className="flex flex-col sm:flex-row justify-between items-end gap-4 mb-8">
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

            {/* Favorites Filter Button */}
            <div className="flex flex-col">
              <h5 className={`block `}>Filter by favorites</h5>
              <button
                className={`flex gap-2.5 justify-between items-center w-full cursor-default rounded bg-white text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-xs sm:text-sm py-2 px-1 lg:py-4 lg:px-3 mt-2`}
                onClick={() => setShowFavorites(!showFavorites)}
              >
                {showFavorites ? "Show All Recipes" : "Show Favorites"}
              </button>
            </div>
          </div>

          {/* Recipes List */}
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : currentRecipes.length > 0 ? (
            <div className="flex flex-col justify-center items-center">
              <Button text={"Add Recipe"} customFunction={handleOpenAddForm} />

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
                    handleDeleteRecipe={() => deleteRecipe(recipe.id)}
                    handleOpenEditForm={() => handleOpenEditForm(recipe)}
                    handleToggleFavorite={() => toggleFavorite(recipe.id)}
                    bgColor="#E7FAFE"
                  />
                ))}
              </div>
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

      {/* Edit Recipe Form */}
      {showEditForm && (
        <EditRecipeForm
          handleForm={handleCloseEditForm}
          editRecipe={editRecipe}
          initialRecipe={selectedRecipe}
        />
      )}

      {/* Add Recipe Form */}
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
