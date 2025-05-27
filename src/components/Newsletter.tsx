import { Heading, SubHeading } from "../utils/Utils";
import food20 from "../assets/images/food20.png";
import two_fork_salad from "../assets/images/two_fork_salad.png";

export default function Newsletter() {
  return (
    <section className="flex justify-center items-center">
      <div className="w-[95%] sm:w-[90%] relative bg-[#E7F9FD] flex flex-col justify-center items-center gap-16 rounded-3xl pt-18 px-4 overflow-hidden">
        <div className="flex flex-col justify-center items-center gap-6">
          <Heading
            text="Deliciousness to your inbox"
            customClass="text-black text-center"
          />
          <SubHeading
            text="Join our community of food lovers and share your favorite recipes
                  with us. We can't wait to see what you create!"
            customClass="text-center text-gray-500 max-w-4/5"
          />
        </div>

        <form className="grid grid-cols-4 justify-between items-center rounded-lg overflow-hidden lg:w-4/10">
          <div className="bg-white flex justify-between items-center py-4 px-6 w-full h-full col-span-3">
            <input
              type="email"
              placeholder="Your email address"
              className="text-xs sm:text-sm md:text-base leading-normal text-gray-700 outline-0 w-full h-full placeholder:text-gray-400"
            />
          </div>
          {/* <Button
            text="Join Now"
            type="submit"
            textColor="text-white"
            customClass="bg-black px-4 py-0 rounded-lg text-xs sm:text-sm md:text-base"
          /> */}
          <button type="submit" className="h-full bg-black px-3 py-2 text-xs sm:text-sm text-white"> Join</button>
        </form>

        <figure>
          <img
            src={two_fork_salad}
            alt="salad"
            className="absolute w-40 sm:w-60 lg:w-96 -bottom-20 -left-10 lg:-bottom-40 lg:-left-20"
          />
        </figure>
        <figure>
          <img
            src={food20}
            alt="salad"
            className="absolute w-40 sm:w-60 lg:w-96 -bottom-20 -right-10 lg:-bottom-40 lg:-right-20"
          />
        </figure>
      </div>
    </section>
  );
}
