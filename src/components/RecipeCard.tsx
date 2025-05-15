import { Badge, Dropdown } from "../utils/Utils";
import timer from "../assets/icons/Timer.svg";
import forkKnife from "../assets/icons/ForkKnife.svg";
import heart_fill from "../assets/icons/heart_fill.svg";
import heart_blank from "../assets/icons/heart_blank.svg";
import { Link } from "react-router-dom";
import { RecipeCardType } from "../utils/Types";
import React from "react";

const Recipe = React.memo(({
  id,
  image,
  name,
  time,
  category,
  isFavorite,
  bgColor,
  customClass,
  handleDeleteRecipe,
  handleOpenEditForm,
  handleToggleFavorite,
}: RecipeCardType) => {
  return (
    <div
      className={`relative flex flex-col justify-between gap-4 rounded-2xl p-3 w-full sm:w-fit max-w-80 max-h-96 min-h-96 cursor-pointer ${customClass}`}
      style={{
        background: `linear-gradient(to bottom, white, ${
          bgColor ? bgColor : "transparent"
        })`,
      }}
    >
      <figure className="relative overflow-hidden rounded-2xl max">
        <div
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white"
          onClick={handleToggleFavorite}
        >
          <img src={isFavorite ? heart_fill : heart_blank} alt="fav" />
        </div>
        <Link to={`/recipes/${id}`}>
          <img src={image} alt={name} />
        </Link>
      </figure>
      <div>
        <Link
          to={`/recipes/${id}`}
          className="text-xl font-semibold mb-6 hover:text-blue-500/70 transition"
        >
          {name}
        </Link>
        <div className="flex ml-[-8px]">
          <Badge icon={timer} text={`${time} minutes`} />
          <Badge icon={forkKnife} text={category} />
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <Dropdown
          handleDeleteRecipe={handleDeleteRecipe || (() => {})}
          handleOpenEditForm={handleOpenEditForm || (() => {})}
        />
      </div>
    </div>
  );
});

export default Recipe;
