export interface RecipeType {
  id?: number,
  name: string,
  time: number,
  category: string,
  image: string,
  isFavorite: boolean,
}

export interface BadgeType {
  icon: string;
  text: string;
  customClass?: string;
};

export interface UserType {
  name: string;
  profilePicture: string;
};

export interface ButtonType {
  text: string;
  icon: string;
  customClass?: string;
};

export interface HeroSlideProps {
  title: string;
  description: string;
  badges: BadgeType[];
  user: UserType;
  backgroundImage: string;
  button: ButtonType;
};

export interface HeroSlideType {
  title: string;
  description: string;
  badges: {
    icon: string;
    text: string;
    customClass?: string;
  }[];
  user: {
    name: string;
    profilePicture: string;
    // date: Date;
  };
  backgroundImage: string;
  button: {
    text: string;
    icon: string;
    customClass?: string;
  };
}

export interface OptionType {
  id: string | number;
  name: string;
};

export interface SelectDropdownProps {
  label: string;
  options: OptionType[];
  selected: OptionType;
  onChange: (value: OptionType) => void;
  labelStyle?: string;
  optionStyle?: string;
  buttonStyle?: string;
};

export interface FormInputProps {
  type: string;
  placeholder: string;
  customClass?: string;
  customFunction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  id?: string;
  required?: boolean;
  label?: string;
  labelStyle?: string;
  inputStyle?: string;
  isTextArea?: boolean
};


export interface BadgeProps {
  icon: string;
  text: string;
  fontWeight?: string;
  customClass?: string;
};

export interface CategoryItemProps {
  image: string;
  name: string;
  bgColor: string;
};

export interface DropdownProps {
  handleDeleteRecipe: () => void;
  handleOpenEditForm?: () => void;
};

export interface HeadingProps {
  text: string;
  customClass?: string;
};

export interface SubHeadingProps {
  text: string;
  customClass?: string;
};

export interface ButtonProps {
  text: string;
  icon?: string;
  textColor?: string;
  customClass?: string;
  type?: "submit" | "reset" | "button";
  customFunction?: () => void;
};

export interface StickyObjectProps {
  image: string;
  customClass: string;
};

