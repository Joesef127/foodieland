import { Badge, Dropdown } from "../utils/Utils";
import timer from "../assets/icons/Timer.png";
import forkKnife from "../assets/icons/ForkKnife.png";
import heart_fill from "../assets/icons/heart_fill.png";
import heart_blank from "../assets/icons/heart_blank.png";

export default function Recipe({
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
}: {
  image: string;
  name: string;
  time: number | string;
  category: string;
  isFavorite: boolean;
  bgColor?: string;
  customClass?: string;
  handleDeleteRecipe?: () => void;
  handleOpenEditForm?: () => void;
  handleToggleFavorite?: () => void;
}) {
  
  return (
    <div
      className={`relative flex flex-col justify-between gap-4 rounded-2xl p-3 w-full sm:w-fit max-w-80 max-h-96 cursor-pointer ${customClass}`}
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
        <img src={image} alt={name} />
      </figure>
      <div>
        <p className="text-xl font-semibold mb-6">{name}</p>
        <div className="flex ml-[-8px]">
          <Badge icon={timer} text={`${time} minutes`} />
          <Badge icon={forkKnife} text={category} />
        </div>
      </div>
      <div
        className="absolute bottom-4 right-4"
      >
        <Dropdown 
          handleDeleteRecipe={handleDeleteRecipe || (() => {})} 
          handleOpenEditForm={handleOpenEditForm || (() => {})}
        />
      </div>
    </div>
  );
}
