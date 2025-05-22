import green_star from "../assets/images/green_star.svg";
import green_food from "../assets/images/green_food.svg";

export default function GreenCard() {
  return (
    <div
      className="relative flex justify-center items-center p-8 h-fit overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #336F53, #1E4B3D)",
      }}
    >
      <img src={green_star} className="absolute z-[1] w-[120%]" />
      <div className="z-[2] flex flex-col justify-center items-center">
        <p className="max-w-40 text-center text-xl text-white lobster-regular">
          Don’t forget to eat healthy food
        </p>
        <figure>
          <img src={green_food} className="" />
        </figure>
        <p className="text-white/60 text-sm font-medium">www.foodieland.com</p>
      </div>
    </div>
  );
}
