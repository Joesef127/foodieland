import EditRecipeForm from "../components/EditRecipe";
import useRecipe from "../hooks/useRecipe";

import { useState } from "react";
import { Heading } from "./Utils";
import RecipeCard from "../components/RecipeCard";
import { RecipeType } from "./Types";

export default function RecipeShortList({
  headingText,
}: {
  headingText: string;
}) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
  const {
    deleteRecipe,
    editRecipe,
    recipeData,
    error,
    toggleFavorite,
  } = useRecipe();

  function handleOpenEditForm(recipe: RecipeType): void {
    setSelectedRecipe(recipe);
    setShowEditForm(true);
  }
  function handleCloseEditForm(): void {
    setShowEditForm(false);
    setSelectedRecipe(null);
  }


  return (
    <section className="flex justify-center items-center mt-10">
      <div className="w-[95%] sm:w-[90%] flex flex-col gap-5">
        <Heading text={headingText} customClass="text-center" />
        { error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : recipeData.length > 0 ? (
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl gap-0 mt-10">
              {recipeData.slice(-4).map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  image={recipe.image}
                  name={recipe.name}
                  time={recipe.time}
                  category={recipe.category}
                  isFavorite={recipe.isFavorite}
                  handleToggleFavorite={() => toggleFavorite(recipe.id)}
                  handleDeleteItem={() => deleteRecipe(recipe.id)}
                  handleOpenEditForm={() => handleOpenEditForm(recipe)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
      {showEditForm && (
        <EditRecipeForm
          handleForm={handleCloseEditForm}
          editRecipe={editRecipe}
          initialRecipe={selectedRecipe}
        />
      )}
    </section>
  );
}
