import { Link } from "react-router-dom";
import { BlogCardProps } from "../utils/Types";

export default function BlogCard({
  id,
  title,
  image,
  author,
  date,
  excerpt,
}: BlogCardProps) {
  return (
    <div
      key={id}
      className="flex flex-col sm:flex-row gap-4 items-center rounded-2xl p-2 sm:p-4 bg-white shadow-md hover:shadow-lg transition-shadow"
    >
      <Link to={`/blog/${id}`}>
        <figure className="relative h-fit size-64 sm:max-w-36 md:min-w-40 md:max-w-40 lg:min-w-32 lg:max-w-44 rounded-xl lg:rounded-2xl overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-[1.1] transition-transform"
          />
        </figure>
      </Link>
      <div className="flex flex-col justify-between items-start gap-2 w-full">
        <div className="flex flex-col gap-2 justify-center items-center sm:justify-start sm:items-start w-full">
          <Link
            to={`/blog/${id}`}
            className="text-sm sm:text-base lg:text-lg font-semibold hover:text-indigo-600"
          >
            {title}
          </Link>
          <p className="text-xs sm:text-sm text-center sm:text-start text-gray-700">
            {excerpt}
          </p>
        </div>
        <p className="text-sm text-gray-500 text-center sm:text-start w-full">
          By {author} • {date}
        </p>
      </div>
    </div>
  );
}
