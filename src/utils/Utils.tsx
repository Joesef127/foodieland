export const Badge = ({
  icon,
  text,
  fontWeight,
  customClass,
}: {
  icon: string;
  text: string;
  fontWeight?: string;
  customClass?: string;
}) => {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-full sm:py-2 sm:px-3 py-1.5 px-2.5 w-fit ${customClass}`}
    >
      <span>
        <img src={icon} alt="" />
      </span>
      <p className={`text-gray-600 text-sm font-${fontWeight}`}>{text}</p>
    </div>
  );
};

export const CategoryItem = ({
  image,
  title,
  bgColor,
}: {
  image: string;
  title: string;
  bgColor: string;
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-8 py-5 px-8 rounded-3xl shadow-md`}
      style={{
        background: `linear-gradient(to bottom, white, ${bgColor})`,
      }}
    >
      <figure>
        <img src={image} alt={title} className="max-w-24" />
      </figure>
      <p className="text-lg font-semibold">{title}</p>
    </div>
  );
};

export const Button = ({
  text,
  icon,
  textColor,
  customClass,
}: {
  text: string;
  icon?: string;
  textColor?: string;
  customClass?: string;
}) => {
  return (
    <button
      className={`flex justify-center items-center gap-2 text-xs sm:text-xs lg:text-base font-semibold cursor-pointer transition duration-300 py-2 px-3 sm:py-2.5 sm:px-4 md:py-4 md:px-6 lg:py-4 lg:px-8 rounded-xl lg:rounded-2xl shadow-md ${customClass}`}
      aria-label={text}
    >
      <span className={`${textColor}`}>{text}</span>
      {icon && <img src={icon} alt={text} />}
    </button>
  );
};

export const Heading = ({
  text,
  customClass,
}: {
  text: string;
  customClass?: string;
}) => {
  return (
    <h1
      className={`font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl ${customClass}`}
    >
      {text}
    </h1>
  );
};

export const SubHeading = ({
  text,
  customClass,
}: {
  text: string;
  customClass?: string;
}) => {
  return (
    <h2
      className={`font-normal text-xs sm:text-sm lg:text-base ${customClass}`}
    >
      {text}
    </h2>
  );
};

// export const Recipe = ({
//   image,
//   title,
//   time,
//   type,
// }: {
//   image: string;
//   title: string;
//   time: string;
//   type: string;
// }) => {
//   return (
//     <div className="flex flex-col justify-center items-center gap-4 bg-white rounded-3xl shadow-md p-5">
//       <figure>
//         <img src={image} alt={title} className="max-w-24" />
//       </figure>
//       <h3 className="text-lg font-semibold">{title}</h3>
//       <div className="flex items-center gap-2">
//         <Badge icon={time} text={time} />
//         <Badge icon={type} text={type} />
//       </div>
//     </div>
//   );
// };
