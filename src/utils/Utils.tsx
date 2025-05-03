import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import "./utils.css";

export const Badge = ({
  icon,
  text,
  fontWeight,
  customClass,
}: {
  icon: string;
  text: string;
  fontWeight?: string;
  customClass?: string;
}) => {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-full sm:py-2 sm:px-3 py-1.5 px-2.5 w-fit ${customClass}`}
    >
      <span>
        <img src={icon} alt="" />
      </span>
      <p className={`text-gray-600 text-sm font-${fontWeight}`}>{text}</p>
    </div>
  );
};

export const CategoryItem = ({
  image,
  name,
  bgColor,
}: {
  image: string;
  name: string;
  bgColor: string;
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center w-full gap-4 md:gap-6 lg:gap-8 py-5 px-8 rounded-3xl shadow-md`}
      style={{
        background: `linear-gradient(to bottom, white, ${bgColor})`,
      }}
    >
      <figure>
        <img
          src={image}
          alt={name}
          className="max-w-14 sm:max-w-18 md:max-w-20"
        />
      </figure>
      <p className="text-lg font-semibold">{name}</p>
    </div>
  );
};

export const Button = ({
  text,
  icon,
  textColor,
  customClass,
  type,
  customFunction,
}: {
  text: string;
  icon?: string;
  textColor?: string;
  customClass?: string;
  type?: "submit" | "reset" | "button";
  customFunction?: () => void;
}) => {
  return (
    <button
      className={`flex justify-center items-center gap-2 text-xs sm:text-xs lg:text-base font-semibold cursor-pointer transition duration-300 py-2 px-3 sm:py-2.5 sm:px-4 md:py-4 md:px-6 lg:py-4 lg:px-8 rounded-xl lg:rounded-2xl shadow-md ${customClass}`}
      aria-label={text}
      onClick={customFunction}
      type={type}
    >
      <span className={`${textColor}`}>{text}</span>
      {icon && <img src={icon} alt={text} />}
    </button>
  );
};

export const Heading = ({
  text,
  customClass,
}: {
  text: string;
  customClass?: string;
}) => {
  return (
    <h1
      className={`font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl ${customClass}`}
    >
      {text}
    </h1>
  );
};

export const SubHeading = ({
  text,
  customClass,
}: {
  text: string;
  customClass?: string;
}) => {
  return (
    <h2
      className={`font-normal text-xs sm:text-sm lg:text-base ${customClass}`}
    >
      {text}
    </h2>
  );
};

export const StickyObject = ({
  image,
  customClass,
}: {
  image: string;
  customClass: string;
}) => {
  return (
    <span>
      <img
        src={image}
        alt="Sticky object"
        className={`animate-bounce absolute w-8 sm:w-10 lg:w-12 ${customClass}`}
      />
    </span>
  );
};

export const Dropdown = ({
  handleDeleteRecipe,
  handleOpenEditForm,
}: {
  handleDeleteRecipe: () => void;
  handleOpenEditForm?: () => void;
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="w-full justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="on w-6 text-black"
          >
            <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"></path>
          </svg>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 min-w-28 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
              type="button"
              className="block w-full text-start px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              onClick={handleOpenEditForm}
            >
              Edit
            </button>
          </MenuItem>
          <MenuItem>
            <button
              type="button"
              className="block w-full text-start px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              onClick={handleDeleteRecipe}
            >
              Delete
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export const LoadingSpinner = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <span className="loader"></span>
    </div>
  );
};
