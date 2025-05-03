import { HeroSlideType } from "./Types";
import food3 from "../assets/images/food3.png";
import food5 from "../assets/images/food5.png";
import food7 from "../assets/images/food7.png";
import food10 from "../assets/images/food10.png";
import food12 from "../assets/images/food12.png";

export const heroSlides: HeroSlideType[] = [
  {
    title: "Spicy and Delicious Chicken Wings",
    description:
      "Discover new flavors and cooking techniques to elevate your culinary skills and enjoy them with a variety of dipping sauces for an extra kick!",
    badges: [
      { icon: "timer", text: "30 minutes" },
      { icon: "forkKnife", text: "Chicken" },
    ],
    user: {
      name: "John Smith",
      profilePicture: "user_dp",
    },
    backgroundImage: food3,
    button: {
      text: "View Recipes",
      icon: "play_icon",
    },
  },
  {
    title: "Sweet and Savory Pancakes",
    description:
      "Indulge in the perfect balance of sweetness and savoriness with our pancake recipes, perfect for breakfast or brunch!",
    badges: [
      { icon: "timer", text: "20 minutes" },
      { icon: "forkKnife", text: "Pancakes" },
    ],
    user: {
      name: "Jane Doe",
      profilePicture: "user_dp",
    },
    backgroundImage: food7,
    button: {
      text: "Explore Recipes",
      icon: "play_icon",
    },
  },
  {
    title: "Healthy and Refreshing Salads",
    description:
      "Enjoy a variety of fresh and healthy salad recipes that are perfect for any meal of the day!",
    badges: [
      { icon: "timer", text: "15 minutes" },
      { icon: "forkKnife", text: "Salad" },
    ],
    user: {
      name: "Alice Green",
      profilePicture: "user_dp",
    },
    backgroundImage: food10,
    button: {
      text: "Try Now",
      icon: "play_icon",
    },
  },
  {
    title: "Juicy and Tender Steaks",
    description:
      "Master the art of cooking the perfect steak with our easy-to-follow recipes and tips!",
    badges: [
      { icon: "timer", text: "40 minutes" },
      { icon: "forkKnife", text: "Steak" },
    ],
    user: {
      name: "Robert Brown",
      profilePicture: "user_dp",
    },
    backgroundImage: food12,
    button: {
      text: "Cook Now",
      icon: "play_icon",
    },
  },
  {
    title: "Delicious and Creamy Pastas",
    description:
      "Savor the taste of Italy with our creamy and delicious pasta recipes that are perfect for any occasion!",
    badges: [
      { icon: "timer", text: "25 minutes" },
      { icon: "forkKnife", text: "Pasta" },
    ],
    user: {
      name: "Sophia White",
      profilePicture: "user_dp",
    },
    backgroundImage: food5,
    button: {
      text: "Discover More",
      icon: "play_icon",
    },
  },
];
