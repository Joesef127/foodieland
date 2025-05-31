import { useState, useEffect } from "react";
import {
  fetchRecipe,
  AddRecipe,
  handleEditRecipe,
  handleDeleteRecipe,
  handleToggleFavorite,
} from "../utils/RecipeCrud";
import { RecipeType } from "../utils/Types";

const useRecipe = () => {
  const [recipeData, setRecipeData] = useState<RecipeType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchRecipe();
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Recipes not found.");
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(`Unexpected error: ${response.statusText}`);
        }
      }
      const data: RecipeType[] = await response.json();
      console.log("Fetched recipes:", data);
      setRecipeData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while fetching recipes.");
      }
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const addRecipe = async (recipe: RecipeType): Promise<RecipeType | null> => {
    
    setError(null);
    try {
      const response = await AddRecipe(recipe);
      if (!response.ok) {
        if (response.status === 422) {
          throw new Error("Validation error. Please check your input.");
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(`Unexpected error: ${response.statusText}`);
        }
      }
      const newRecipe = await response.json();
      setRecipeData((prevRecipes) => [...prevRecipes, newRecipe]);
      return newRecipe;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while adding the recipe.");
      }
      console.error("Error adding recipe:", error);
      return null;
    } finally {
      console.log("Recipe added successfully");
    }
  };

  const editRecipe = async (
    id: number | undefined,
    recipe: RecipeType
  ): Promise<RecipeType | void> => {
   
    setError(null);
    try {
      const response = await handleEditRecipe(id, recipe);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Recipe not found.");
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(`Unexpected error: ${response.statusText}`);
        }
      }
      const updatedRecipe = await response.json();
      setRecipeData((prevRecipes) =>
        prevRecipes.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))
      );
      return updatedRecipe;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while editing the recipe.");
      }
      console.error("Error editing recipe:", error);
    } finally {
      console.log("Recipe edited successfully");
    }
  };

  const deleteRecipe = async (id: number | undefined): Promise<boolean> => {
    
    setError(null);
    try {
      const response = await handleDeleteRecipe(id);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Recipe not found.");
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(`Unexpected error: ${response.statusText}`);
        }
      }
      setRecipeData((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while deleting the recipe.");
      }
      console.error("Error deleting recipe:", error);
      return false;
    } finally {
      console.log("Recipe deleted successfully");
    }
  };

  const toggleFavorite = async (
    id: number | undefined
  ): Promise<RecipeType | null> => {
    
    setError(null);
    try {
      const response = await handleToggleFavorite(id);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Recipe not found.");
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(`Unexpected error: ${response.statusText}`);
        }
      }
      const updatedRecipe = await response.json();
      setRecipeData((prevRecipes) =>
        prevRecipes.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))
      );
      return updatedRecipe;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while toggling favorite status.");
      }
      console.error("Error toggling favorite status:", error);
      return null;
    } finally {
      console.log("Recipe favorite status toggled successfully");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return {
    recipeData,
    isLoading,
    error,
    fetchRecipes,
    addRecipe,
    editRecipe,
    deleteRecipe,
    toggleFavorite,
  };
};

export default useRecipe;
