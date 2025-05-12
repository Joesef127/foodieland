import { useState, useEffect } from "react";
import {
  Button,
  FormInput,
  Heading,
  LoadingSpinner,
  SubHeading,
} from "../utils/Utils";
import smiling_chef from "../assets/images/smiling_chef.png";
import Newsletter from "../components/Newsletter";
import SelectDropdown from "../utils/SelectDropdown";
import RecipeCard from "../components/RecipeCard";
import { OptionType, RecipeType } from "../utils/Types";

const enquiryTypeOptions = [
  { id: 1, name: "General Enquiry" },
  { id: 2, name: "Feedback" },
  { id: 3, name: "Support" },
  { id: 4, name: "Advertising" },
  { id: 5, name: "Complaint" },
  { id: 6, name: "Other" },
];

export default function Contact() {
  const [selectedEnquiryType, setSelectedEnquiryType] = useState<OptionType>();
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch 4 recipes from the backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:8000/recipes?limit=4");
        if (!res.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data: RecipeType[] = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="pb-20 overflow-y-scroll relative inter">
      <section className="relative flex justify-center items-center mt-10 gap-20">
        <div className="w-[95%] sm:w-[90%] flex flex-col gap-5">
          <div className="flex flex-col justify-between items-center mb-10">
            <Heading text="Contact Us" customClass="text-center" />
            <SubHeading
              text="We would love to hear from you!"
              customClass="text-center text-gray-500"
            />
          </div>

          <div className="flex gap-10">
            <div className="w-full grid grid-cols-1 md:grid-cols-1 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 gap-5">
              <div
                className="relative rounded-3xl shadow-md flex justify-center items-center px-5 py-0 h-fit w-full col-span-1 order-2 lg:order-1"
                style={{
                  background: "linear-gradient(to bottom, white, #EDFAFD)",
                }}
              >
                <img src={smiling_chef} alt="Smiling chef" />
              </div>

              <div className="flex flex-col col-span-1 lg:col-span-2 order-1 lg:order-2">
                <form className="flex flex-col gap-6 w-full">
                  <div className="grid grid-cols-2 gap-2.5 lg:gap-5 w-full">
                    <FormInput
                      placeholder="Enter your name"
                      type="text"
                      name="name"
                      id="name"
                      label="NAME"
                      customClass="text-gray-700"
                      inputStyle="text-sm"
                      labelStyle="text-xs"
                      required={true}
                    />

                    <FormInput
                      placeholder="Enter your email"
                      type="email"
                      name="email"
                      id="email"
                      label="EMAIL"
                      customClass="text-gray-700"
                      inputStyle="text-sm"
                      labelStyle="text-xs"
                      required={true}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 lg:gap-5 w-full">
                    <FormInput
                      placeholder="Enter subject"
                      type="text"
                      name="subject"
                      id="subject"
                      label="SUBJECT"
                      customClass="text-gray-700"
                      inputStyle="text-sm"
                      labelStyle="text-xs"
                      required={true}
                    />

                    <SelectDropdown
                      label="Enquiry Type"
                      options={enquiryTypeOptions}
                      selected={selectedEnquiryType || enquiryTypeOptions[0]}
                      onChange={setSelectedEnquiryType}
                      buttonStyle="border border-gray-300 bg-transparent shadow:sm focus:border-indigo-500 focus:ring-indigo-500"
                      optionStyle="w-full"
                      labelStyle="text-xs font-normal text-gray-700 uppercase"
                    />
                  </div>
                  <FormInput
                    isTextArea={true}
                    name="message"
                    id="message"
                    placeholder="Enter your message"
                    label="MESSAGES"
                    labelStyle="text-xs"
                    inputStyle="text-sm"
                    rows={5}
                    customClass="text-gray-700"
                    required={false}
                  />
                  <Button
                    text="Submit"
                    customClass="bg-black text-white mt-6"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="my-32">
        <Newsletter />
      </section>

      <section className="flex justify-center items-center mt-10">
        <div className="w-[95%] sm:w-[90%] flex flex-col gap-5">
          <Heading
            text="Check out the delicious recipes"
            customClass="text-center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl gap-0 mt-10">
            {isLoading && (
              <div>
                <LoadingSpinner />
              </div>
            )}
            {recipes.slice(-4).map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                image={recipe.image}
                name={recipe.name}
                time={recipe.time}
                category={recipe.category}
                isFavorite={recipe.isFavorite}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
