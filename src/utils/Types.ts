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