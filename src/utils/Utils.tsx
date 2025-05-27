import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import "../styles/utils.css";
import {
  BadgeProps,
  ButtonProps,
  CategoryItemProps,
  DropdownProps,
  FormInputProps,
  HeadingProps,
  RecipeType,
  StickyObjectProps,
  SubHeadingProps,
  UserType,
} from "./Types";
import { formatDate } from "./utilFunctions";
// import useAOS from "../hooks/useAOS";

export const BaseUrl = "http://localhost:8000/";

export const Badge = ({
  icon,
  text,
  fontWeight,
  customClass,
  time,
  timeStyle,
}: BadgeProps) => {
  return (
    <div
      className={`flex flex-wrap items-center gap-1 sm:gap-1.5 rounded-full sm:py-2 sm:px-3 py-1 px-2.5 w-fit ${customClass}`}
    >
      <span>
        <img src={icon} alt="" />
      </span>

      <div className="flex flex-col">
        <p className={`text-gray-600 text-xs sm:text-sm font-${fontWeight}`}>
          {text}
        </p>

        <p className={`text-xs sm:text-sm font-normal ${timeStyle}`}>
          {time || ""}
        </p>
      </div>
    </div>
  );
};

export const UserBox = ({
  userPic,
  userName,
  customStyle,
  dateStyle,
  nameStyle,
  imageStyle,
  postDate,

  user,
}: {
  user?: UserType;
  userPic?: string;
  userName?: string;
  customStyle?: string;
  dateStyle?: string;
  nameStyle?: string;
  imageStyle?: string;
  postDate?: string;
}) => {
  return (
    <div className={`flex items-center gap-2 lg:gap-4 ${customStyle}`}>
      <figure
        className={`overflow-hidden rounded-full max-w-10 max-h-10 lg:max-w-14 lg:max-h-14 border border-black ${imageStyle}`}
      >
        <img src={user?.profilePicture || userPic} alt="User pic" />
      </figure>
      <div>
        <h3
          className={`mb-1 sm:mb-2 font-bold text-xs sm:text-sm lg:text-base ${nameStyle}`}
        >
          {user?.name || userName}
        </h3>
        <p className={`text-xs sm:text-sm font-medium ${dateStyle}`}>
          {postDate
            ? formatDate(postDate)
            : formatDate(new Date().toISOString())}
        </p>
      </div>
    </div>
  );
};

export const CategoryItem = ({ image, name, animation, bgColor }: CategoryItemProps) => {
  
  return (
    <div
      className={`flex flex-col justify-center items-center w-full gap-4 md:gap-6 lg:gap-8 py-5 px-8 rounded-3xl shadow-md`}
      style={{
        background: `linear-gradient(to bottom, white, ${bgColor})`,
      }}
      data-aos={animation}
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
  animation,
}: ButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center gap-2 text-xs sm:text-xs lg:text-base font-semibold cursor-pointer transition duration-300 py-2 px-3 sm:py-2.5 sm:px-4 md:py-4 md:px-6 lg:py-4 lg:px-8 rounded-xl lg:rounded-2xl shadow-md ${customClass}`}
      aria-label={text}
      onClick={customFunction}
      type={type}
      data-aos={animation}  
    >
      <span className={`${textColor}`}>{text}</span>
      {icon && <img src={icon} alt={text} />}
    </button>
  );
};

export const Heading = ({ text, animation, customClass }: HeadingProps) => {
  return (
    <h1
      className={`font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl ${customClass}`} data-aos={animation}
    >
      {text}
    </h1>
  );
};

export const SubHeading = ({ text, animation, customClass }: SubHeadingProps) => {
  return (
    <h2
      className={`font-normal text-xs sm:text-sm lg:text-base ${customClass}`}
      data-aos={animation}
    >
      {text}
    </h2>
  );
};

export const StickyObject = ({ image, customClass }: StickyObjectProps) => {
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
  handleDeleteItem,
  handleOpenEditForm,
}: DropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="w-full justify-center cursor-pointer">
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
              className="block w-full text-start px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden cursor-pointer"
              onClick={handleOpenEditForm}
            >
              Edit
            </button>
          </MenuItem>
          <MenuItem>
            <button
              type="button"
              className="block w-full text-start px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden cursor-pointer"
              onClick={handleDeleteItem}
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

export const FormInput = ({
  type,
  placeholder,
  customClass,
  customFunction,
  value,
  name,
  id,
  required,
  label,
  labelStyle,
  inputStyle,
  isTextArea,
  rows,
  cols,
}: FormInputProps) => {
  return (
    <div className={`grid grid-cols-1 gap-2 ${customClass}`}>
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      {isTextArea ? (
        <textarea
          rows={rows}
          cols={cols}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          required={required}
          className={`w-full rounded-md shadow-sm py-2 px-3 lg:py-4 lg:px-5 text-sm border border-gray-300 bg-transparent focus:border-indigo-500 focus:ring-indigo-500 ${inputStyle}`}
        ></textarea>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-md shadow-sm py-2 px-3 lg:py-4 lg:px-5 text-sm border border-gray-300 bg-transparent focus:border-indigo-500 focus:ring-indigo-500 ${inputStyle}`}
          onChange={customFunction}
          value={value}
          name={name}
          id={id}
          required={required}
        />
      )}
    </div>
  );
};

export const ShuffleArray = (array: RecipeType[]) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

export const OutputIcon = ({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 md:gap-4">
      <div className="bg-[#E7FAFE] rounded-full p-4 md:p-6 lg:p-7 w-fit h-fit">
        <img src={icon} alt="print" className="w-3" />
      </div>
      <p className="uppercase text-xs font-medium">{title}</p>
    </div>
  );
};
