import { Heading, SubHeading, Button } from "../utils/Utils";
import food20 from "../assets/images/food20.png";
import two_fork_salad from "../assets/images/two_fork_salad.png";

export default function Newsletter() {
  return (
    <section className="mb-28 flex justify-center items-center">
      <div className="w-[95%] sm:w-[90%] relative bg-[#E7F9FD] flex flex-col justify-center items-center gap-16 rounded-3xl pt-18 overflow-hidden">
        <div className="flex flex-col justify-center items-center gap-6">
          <Heading
            text="Deliciousness to your inbox"
            customClass="text-black"
          />
          <SubHeading
            text="Join our community of food lovers and share your favorite recipes
                  with us. We can't wait to see what you create!"
            customClass="text-center text-gray-500 max-w-4/5"
          />
        </div>

        <div className="flex justify-between items-center gap-3 py-4 px-6 bg-white rounded-3xl w-4/10">
          <input
            type="email"
            placeholder="Your email address"
            className="text-xs sm:text-sm md:text-base leading-normal text-gray-700 w-4/6"
          />
          <Button
            text="Join Now"
            textColor="text-white"
            customClass="bg-black"
          />
        </div>

        <figure>
          <img src={two_fork_salad} alt="salad" className="absolute -bottom-40 -left-20" />
        </figure>
        <figure>
          <img src={food20} alt="salad" className="absolute  -bottom-40 -right-20" />
        </figure>
      </div>
    </section>
  );
}
