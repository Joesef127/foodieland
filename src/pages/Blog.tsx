import { Heading, SubHeading } from "../utils/Utils";

export default function Blog() {
  return (
    <div className="pb-20 overflow-y-scroll relative inter">
      <section className="relative flex justify-center items-center mt-10 gap-20">
        <div className="w-[95%] sm:w-[90%] flex flex-col gap-5">
          <div className="flex flex-col justify-between items-center mb-10">
            <Heading text="Blog & Article" customClass="text-center" />
            <SubHeading
              text="Read some articles about food and cooking"
              customClass="text-center text-gray-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
