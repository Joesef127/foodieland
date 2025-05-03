import scroll from "../assets/icons/scroll.png";
import timer from "../assets/icons/Timer.png";
import forkKnife from "../assets/icons/ForkKnife.png";
import user_dp from "../assets/images/user_dp.png";
import play_icon from "../assets/icons/play_icon.png";
import thumbs_badge from "../assets/images/thumbs_badge.png";
import { Badge, Button } from "../utils/Utils";
import { HeroSlideProps } from "../utils/Types";

export default function HeroSlide({
  title,
  description,
  badges,
  user,
  backgroundImage,
  button,
}: HeroSlideProps) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthInString = (date: Date) => months[date.getMonth()];
  const date = new Date();

  return (
    <div className="w-full min-h-10/12 flex relative rounded-2xl sm:rounded-3xl md:rounded-4xl lg:rounded-5xl overflow-hidden">
      <div className="relative py-8 px-4 sm:px-4 sm:py-10 md:px-6 md:py-8 bg-[#E7FAFE] sm:w-1/2 flex flex-col justify-around">
        <Badge
          icon={scroll}
          text="Hot recipe"
          fontWeight="semibold"
          customClass="bg-white absolute top-3 left-3 sm:top-5 sm:left-5 md:top-7 md:left-7 lg:top-7 lg:left-7 z-10"
        />

        <div className="w-full flex flex-col gap-6 max-w-[95%]">
          <div className="flex flex-col justify-between items-start gap-6 mt-9 lg:mt-18">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[54px] font-bold leading-tight text-gray-800">
              {title}
            </h1>

            <p className="text-xs sm:text-sm font-normal text-gray-500 ">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-4">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                icon={badge.icon === "timer" ? timer : forkKnife}
                text={badge.text}
                fontWeight="medium"
                customClass={"bg-[#DBEDF1]"}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-normal sm:justify-between sm:items-center gap-5 mt-6 sm:mt-8">
          <div className="flex items-center gap-2 lg:gap-4">
            <figure className="overflow-hidden rounded-full max-w-10 max-h-10 lg:max-w-14 lg:max-h-14 border border-black">
              <img
                src={user.profilePicture === "user_dp" ? user_dp : ""}
                alt="User profile picture"
              />
            </figure>
            <div>
              <h3 className="mb-1 sm:mb-2 font-bold text-xs sm:text-sm lg:text-base">
                {user.name}
              </h3>
              <p className="text-xs sm:text-sm font-medium">
                {`
                  ${date.getDate()} 
                  ${currentMonthInString(date)} 
                  ${date.getFullYear()}
                `}
              </p>
            </div>
          </div>

          <Button
            text={button.text}
            icon={button.icon === "play_icon" ? play_icon : ""}
            textColor="text-white"
            customClass={"bg-black"}
          />
        </div>
      </div>

      <div
        className="w-1/2 hidden sm:block bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>

      <div className="absolute left-1/2 top-10 transform -translate-x-1/2 hidden sm:block">
        <img
          src={thumbs_badge}
          alt="Thumbs badge"
          className="lg:size-24 md:size-20 sm:size-14 size-10"
          style={{ transform: "rotate(30deg)" }}
        />
      </div>
    </div>
  );
}
