import { RecipeType } from "./Types";
import { BaseUrl } from "./Utils";

export const fetchRecipe = (): Promise<Response> => {
  return fetch(`${BaseUrl}recipes/`);
};

export const fetchRecipeById  = (id: number | undefined): Promise<Response> => {
  return fetch(`${BaseUrl}recipes/${id}`);
};

export const AddRecipe = (recipe: RecipeType): Promise<Response> => {
  return fetch(`${BaseUrl}recipes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
};

export const handleEditRecipe = (
  id: number | undefined,
  recipe: RecipeType
): Promise<Response> => {
  return fetch(`${BaseUrl}recipes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
};

export const handleDeleteRecipe = (id: number | undefined): Promise<Response> => {
  return fetch(`${BaseUrl}recipes/${id}`, {
    method: "DELETE",
  });
};

export const handleToggleFavorite = (id: number | undefined): Promise<Response> => {
  return fetch(`${BaseUrl}recipes/${id}/toggle_favorite`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
