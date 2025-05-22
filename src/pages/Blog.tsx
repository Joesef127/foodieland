import { useParams } from "react-router-dom";
import { Heading, LoadingSpinner, UserBox } from "../utils/Utils";
import Newsletter from "../components/Newsletter";
import RecipeShortList from "../utils/RecipeShortList";
import { useState, useEffect } from "react";
import { mockBlogPosts } from "../utils/MockBlogPosts";
import { BlogCardProps } from "../utils/Types";
import user_dp from "../assets/images/user_dp.png";
import SocialMediaBox from "../components/SocialMediaBox";

export default function Blog() {
  const { id } = useParams<{ id: string }>(); // Get the blog ID from the URL
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [blog, setBlog] = useState<BlogCardProps | undefined>(undefined);

  useEffect(() => {
    // Simulate fetching the blog post
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true);
        const blogPost = mockBlogPosts.find((post) => post.id === Number(id));
        if (!blogPost) {
          throw new Error("Blog post not found");
        }
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

  return (
    <>
      {blog ? (
        <div className="pb-20 overflow-y-scroll relative inter">
          <section className="relative flex justify-center items-center mt-10 gap-20">
            <div className="w-[95%] sm:w-[90%] flex flex-col gap-5">
              <div className="flex flex-col justify-between items-center mb-10">
                <Heading text={blog.title} customClass="text-center mb-6" />
                <div className="grid grid-cols-2 col-span-2 gap-4 items-center">
                  <UserBox
                    userPic={user_dp}
                    customStyle="pr-6 flex-row justify-center items-center border-r sm:border-b sm:border-b-0 border-black/20"
                    dateStyle="hidden"
                  />
                  <UserBox
                    userPic={user_dp}
                    customStyle="flex-row justify-start items-center sm:border-b sm:border-b-0 border-black/20 text-black/60 mb-2"
                    nameStyle="hidden"
                    imageStyle="hidden"
                  />
                </div>
              </div>
              <p className="mb-6 text-gray-700 text-center text-sm sm:text-base">
                {blog.excerpt}
              </p>
              <figure className="w-full overflow-hidden rounded-3xl max-h-[507px]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover object-center"
                />
              </figure>
              <div className="grid grid-cols-4 gap-6 mt-10">
                <div className="flex flex-col gap-6 col-span-3 px-5">
                  {/* Render Blog Content Dynamically */}
                  <div className="py-4">
                    <h2 className="font-bold text-xl">Blog Content</h2>
                    <div className="mt-4 text-gray-700 text-sm sm:text-base">
                    {blog.content && (
                      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-center gap-3">
                  <h3 className="text-lg font-bold text-center">
                    SHARE THIS ON:
                  </h3>
                  <SocialMediaBox boxStyle="flex-col" />
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
