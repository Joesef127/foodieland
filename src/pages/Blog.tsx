import { useParams } from "react-router-dom";
import { BaseUrl, Heading, LoadingSpinner, UserBox } from "../utils/Utils";
import Newsletter from "../components/Newsletter";
import RecipeShortList from "../utils/RecipeShortList";
import { useState, useEffect } from "react";
import { BlogCardProps } from "../utils/Types";
import user_dp from "../assets/images/user_dp.png";
import SocialMediaBox from "../components/SocialMediaBox";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import useAOS from "../hooks/useAOS";

export default function Blog() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [blog, setBlog] = useState<BlogCardProps | undefined>(undefined);

  useAOS({
    duration: 500,
    easing: "ease-in-out",
  });

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BaseUrl}blogs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }
        const blogPost: BlogCardProps = await response.json();
        setBlog(blogPost);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const renderBlogContent = (rawContent: string) => {
    try {
      const contentState = convertFromRaw(JSON.parse(rawContent));
      return stateToHTML(contentState);
    } catch (err) {
      console.error("Error rendering blog content:", err);
      return <p>Failed to render content.</p>;
    }
  };

  return (
    <>
      {blog ? (
        <div className="pb-20 overflow-y-scroll relative inter">
          <section className="relative flex justify-center items-center mt-10 gap-20">
            <div className="w-[95%] sm:w-[90%] flex flex-col gap-5">
              <div className="flex flex-col justify-between items-center mb-2 sm:mb-10">
                <Heading text={blog.title} customClass="text-center mb-6" animation="fade-right" data-aos-delay="100" />
                <div className="grid grid-cols-2 col-span-2 gap-4 items-center">
                  <UserBox
                    userPic={user_dp}
                    customStyle=" w-fit pr-4 sm:pr-6 flex-row sm:justify-center items-center border-r sm:border-b sm:border-b-0 border-black/20"
                    dateStyle="hidden"
                    userName={blog.author}
                    animation="fade-right"
                    data-aos-delay="200"
                  />
                  <UserBox
                    userPic={user_dp}
                    customStyle="flex-row justify-start items-center sm:border-b sm:border-b-0 border-black/20 text-black/60 mb-2 col-span-1"
                    nameStyle="hidden"
                    imageStyle="hidden"
                    postDate={blog.date}
                    animation="fade-left"
                    data-aos-delay="200"
                  />
                </div>
              </div>
              <p className="mb-6 text-gray-700 text-center text-sm sm:text-base" data-aos="fade-up" data-aos-delay="300">
                {blog.excerpt}
              </p>
              <figure className="w-full flex justify-center items-center overflow-hidden rounded-3xl max-h-[507px]" data-aos="fade-up" data-aos-delay="400">
                <img
                  src={blog.image}
                  alt={blog.image}
                  className="w-full h-full"
                />
              </figure>
              <div className="grid sm:grid-cols-4 gap-6 mt-10">
                <div className="flex flex-col gap-6 sm:col-span-3 px-5">
                  <div className="py-4">
                    <h2 className="font-bold text-xl" data-aos="fade-right" data-aos-delay="100">Blog Content</h2>
                    <div
                      className="mt-4 text-gray-700 text-sm sm:text-base"
                      data-aos="fade-up"
                      data-aos-delay="200"
                      dangerouslySetInnerHTML={{
                        __html: renderBlogContent(blog.content || ""),
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-start items-center gap-3">
                  <h3 className="text-lg font-bold text-center" data-aos="fade-left" data-aos-delay="100">
                    SHARE THIS ON:
                  </h3>
                  <SocialMediaBox boxStyle="sm:flex-col" data-aos="fade-left" data-aos-delay="200" />
                  <div className="mt-4" data-aos="fade-left" data-aos-delay="300">
                    <p className="text-start sm:text-center">Follow us for more updates!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="my-20">
            <Newsletter />
          </div>

          <div className="mt-10 sm:mt-20 md:mt-30 lg:mt-40">
            <RecipeShortList headingText="You may like these recipes too" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen text-gray-500">
          Blog not found.
        </div>
      )}
    </>
  );
}
