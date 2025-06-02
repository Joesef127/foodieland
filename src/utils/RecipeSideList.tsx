import { Link } from "react-router-dom";
import useRecipe from "../hooks/useRecipe";
import { ShuffleArray } from "./Utils";
import useAOS from "../hooks/useAOS";

export default function RecipeSideList() {
  const { recipeData } = useRecipe();

  useAOS({
    duration: 500,
    easing: "ease-in-out",
  });

  const randomRecipes = ShuffleArray(recipeData).slice(0, 3);

  return (
    <ul className="flex flex-col gap-5 mt-8">
      {randomRecipes.map((recipe) => {
        return (
          <Link
            to={`/recipes/${recipe.id}`}
            key={recipe.id}
            className="flex lg:grid lg:grid-cols-2 justify-start items-center gap-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <figure className="max-w-32 min-w-32 sm:max-w-36 md:min-w-40 md:max-w-40 lg:min-w-32 lg:max-w-44 rounded-xl lg:rounded-2xl overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full max-h-28 object-cover object-center hover:scale-[1.1] transition-all"
              />
            </figure>
            <div className="flex flex-col justify-between items-start gap-3">
              <p className="text-sm sm:text-base font-semibold hover:text-blue-500/70">
                {recipe.name}
              </p>
              <p className="text-xs sm:text-sm text-black/60">By John Smith </p>
            </div>
          </Link>
        );
      })}
    </ul>
  );
}
