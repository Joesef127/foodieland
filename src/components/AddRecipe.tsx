import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { RecipeType } from "../utils/Types";

export default function AddRecipeForm({
  handleForm,
  AddRecipe,
}: {
  handleForm: () => void;
  AddRecipe: (recipe: RecipeType) => Promise<void>;
}) {
  const [recipe, setRecipe] = useState<RecipeType>({
    name: "",
    time: 0,
    category: "",
    image: "",
    isFavorite: false,
  });

  async function handleAddRecipe(e: React.FormEvent) {
    e.preventDefault();
    if (recipe.name && recipe.image && recipe.time && recipe.category) {
      await AddRecipe(recipe);
      setRecipe({
        name: "",
        time: 0,
        category: "",
        image: "",
        isFavorite: false,
      });
      handleForm();
    } else {
      alert("Please fill out all fields");
    }
  }

  return (
    <Dialog open={true} onClose={handleForm} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Add Recipe
                  </DialogTitle>
                  <p className="mt-1 text-sm text-gray-600">
                    Please fill out the form below to add a new recipe.
                  </p>
                </div>
              </div>
            </div>

            <form className="bg-white px-4 sm:px-6" onSubmit={handleAddRecipe}>
              <div className="mt-5 w-full">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="recipe-name"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="recipe-name"
                      name="recipe-name"
                      type="text"
                      value={recipe.name}
                      onChange={(e) =>
                        setRecipe({ ...recipe, name: e.target.value })
                      }
                      placeholder="Recipe name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="my-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="cooking-time"
                      className="block text-sm font-medium text-gray-900"
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
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Category
                    </label>
                    <div className="mt-2">
                      <select
                        id="category"
                        name="category"
                        value={recipe.category}
                        onChange={(e) =>
                          setRecipe({ ...recipe, category: e.target.value })
                        }
                        className="block w-full rounded-md bg-white py-1.5 px-3 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
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
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="recipe-image"
                      className="block text-sm font-medium text-gray-900"
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
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                >
                  Add Recipe
                </button>
                <button
                  type="button"
                  onClick={handleForm}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
