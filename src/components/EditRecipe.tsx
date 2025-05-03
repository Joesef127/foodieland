import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { RecipeType } from "../utils/Types";

export default function EditRecipeForm({
  handleForm,
  editRecipe,
  initialRecipe,
}: {
  handleForm: () => void;
  editRecipe: (id: number | undefined, recipe: RecipeType) => Promise<void>;
  initialRecipe: RecipeType | null;
}) {
  const [recipe, setRecipe] = useState<RecipeType>(
    initialRecipe || {
      id: 0,
      name: "",
      image: "",
      time: 0,
      category: "",
      isFavorite: false,
    }
  );

  async function handleEditRecipe(e: React.FormEvent) {
    e.preventDefault();
    if (recipe.name && recipe.image && recipe.time && recipe.category) {
      await editRecipe(recipe.id, recipe);
      handleForm();
    } else {
      alert("Please fill out all fields");
    }
  }

  return (
    <form
      className="w-full h-full flex flex-col justify-center items-center bg-white"
      onSubmit={handleEditRecipe}
    >
      <div className="mx-auto">
        <h2 className="text-base/7 font-semibold text-gray-900">Edit Recipe</h2>
        <p className="mt-1 text-sm/6 text-gray-600">
          Please update the form below to edit the recipe.
        </p>

        <div className="mt-5 w-full">
          <div className="sm:col-span-4">
            <label
              htmlFor="recipe-name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <input
                  id="recipe-name"
                  name="recipe-name"
                  type="text"
                  value={recipe.name}
                  onChange={(e) =>
                    setRecipe({ ...recipe, name: e.target.value })
                  }
                  placeholder="Recipe name"
                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          <div className="my-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="cooking-time"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Cooking Time
              </label>
              <div className="mt-2">
                <input
                  id="cooking-time"
                  name="cooking-time"
                  value={recipe.time}
                  onChange={(e) =>
                    setRecipe({ ...recipe, time: Number(e.target.value) })
                  }
                  type="number"
                  placeholder="Cooking time in mins"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Category
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="category"
                  name="category"
                  value={recipe.category}
                  onChange={(e) =>
                    setRecipe({ ...recipe, category: e.target.value })
                  }
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option>Select a category</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="snack">Snack</option>
                  <option value="healthy">Healthy</option>
                  <option value="meat">Meat</option>
                  <option value="noodles">Noodles</option>
                  <option value="sweet">Sweet</option>
                  <option value="western">Western</option>
                  <option value="eastern">Eastern</option>
                  <option value="japanese">Japanese</option>
                  <option value="seafood">Seafood</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="recipe-image"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Recipe Image
              </label>
              <div className="mt-2">
                <input
                  id="recipe-image"
                  name="recipe-image"
                  type="url"
                  value={recipe.image}
                  onChange={(e) =>
                    setRecipe({ ...recipe, image: e.target.value })
                  }
                  placeholder="Paste recipe image URL"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 w-full min-w-max flex gap-2.5 items-center justify-center gap-x-6">
        <button
          type="button"
          className="w-1/2 text-sm/6 font-semibold text-gray-900 bg-white hover:bg-gray-50 shadow-md px-3 py-2 cursor-pointer"
          onClick={handleForm}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-1/2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
