import { useState } from "react";
import { Badge } from "../utils/Utils";
import timer from "../assets/icons/Timer.png";
import forkKnife from "../assets/icons/ForkKnife.png";
import heart_fill from "../assets/icons/heart_fill.png";
import heart_blank from "../assets/icons/heart_blank.png";

export default function Recipe({
  image,
  title,
  time,
  type,
  bgColor,
  customClass,
}: {
  image: string;
  title: string;
  time: string;
  type: string;
  bgColor?: string;
  customClass?: string;
}) {
  const [isFav, setIsFav] = useState<boolean>(false);
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl p-3 max-w-80 min-h-96 cursor-pointer ${customClass}`}
      style={{
        background: `linear-gradient(to bottom, white, ${
          bgColor ? bgColor : "transparent"
        })`,
      }}
    >
      <figure className="relative overflow-hidden rounded-2xl max">
        <div className="absolute top-4 right-4 p-2.5 rounded-full bg-white" onClick={() => {setIsFav(!isFav)}}>
          <img src={isFav ? heart_fill : heart_blank} alt="" />
        </div>
        <img src={image} alt={title} />
      </figure>
      <div>
        <p className="text-xl font-semibold mb-6">{title}</p>
        <div className="flex ml-[-8px]">
          <Badge icon={timer} text={time} />
          <Badge icon={forkKnife} text={type} />
        </div>
      </div>
    </div>
  );
}
