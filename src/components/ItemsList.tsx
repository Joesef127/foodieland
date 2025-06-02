import { ItemsListProps } from "../utils/Types";
import { Heading } from "../utils/Utils";
import useAOS from "../hooks/useAOS";

export default function ItemsList({ title, items }: ItemsListProps) {
  useAOS({
    duration: 500,
    easing: "ease-in-out",
  });

  return (
    <div className="flex flex-col gap-6">
      <Heading text={title} />
      <ul className="">
        {items?.map((item, index) => (
          <li
            key={index}
            className="relative flex justify-start items-center py-3 lg:py-6 border-y first:border-t-0 border-black/10"
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
          >
            <span className="absolute left-0 h-3 w-3 rounded-full border border-[#DBE2E5]"></span>
            <span className="ml-5 text-xs sm:text-sm md:text-base">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
