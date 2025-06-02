import { useState } from "react";
import { Button, Heading, LoadingSpinner, SubHeading } from "../utils/Utils";
import Newsletter from "../components/Newsletter";
import BlogCard from "../components/BlogCard";
import Pagination from "../utils/Pagination";
import GreenCard from "../components/GreenCard";
import RecipeSideList from "../utils/RecipeSideList";
import AddBlog from "../components/AddBlog";
import useBlog from "../hooks/useBlog";
import { BlogCardProps } from "../utils/Types";
import EditBlog from "../components/EditBlog";
import { useGlobalContext } from "../GlobalContext";

export default function BlogList() {
  const { role } = useGlobalContext();

  const {
    blogData,
    isLoading,
    error,
    deleteExistingBlog,
    addNewBlog,
    editExistingBlog,
  } = useBlog();

  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogCardProps | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogData.slice(indexOfFirstPost, indexOfLastPost);

  function handleOpenAddBlog() {
    setShowAddForm(true);
  }

  function handleCloseAddBlog() {
    setShowAddForm(false);
  }

  function handleOpenEditForm(blog: BlogCardProps) {
    setSelectedBlog(blog);
    setShowEditForm(true);
  }

  function handleCloseEditForm() {
    setSelectedBlog(null);
    setShowEditForm(false);
  }

  return (
    <>
      <div className="pb-20 overflow-y-scroll relative inter">
        <section className="relative flex justify-center items-center mt-10 gap-20">
          <div className="w-[95%] sm:w-[90%] flex flex-col justify-center items-center gap-5">
            <div className="relative flex flex-col justify-center items-center w-full col-span-3 sm:col-span-3 md:col-span-2">
              <Heading text="Blog Posts" customClass="mb-4 text-center" />
              <SubHeading
                text="Discover the latest articles, tips, and stories from our blog."
                customClass="text-center text-black/60"
              />
            </div>
            {role === "admin" && (
              <Button
                text={"Add New Blog"}
                customFunction={handleOpenAddBlog}
                customClass="mt-10"
              />
            )}
          </div>
        </section>

        <section className="flex justify-center items-center mt-20">
          <div className="w-[95%] sm:w-[90%] grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="flex flex-col gap-10 col-span-1 lg:col-span-2">
              {isLoading ? (
                <LoadingSpinner />
              ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
              ) : (
                currentPosts.map((post, index) => (
                  <BlogCard
                    key={index}
                    id={post.id}
                    author={post.author}
                    date={post.date}
                    excerpt={post.excerpt}
                    image={post.image}
                    title={post.title}
                    handleDeleteItem={() => deleteExistingBlog(post.id)}
                    handleOpenEditForm={() => handleOpenEditForm(post)}
                  />
                ))
              )}

              <section className="w-full flex lg:hidden justify-center items-center mt-10">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(blogData.length / postsPerPage)}
                  onPageChange={(page) => setCurrentPage(page)}
                  customStyle=""
                />
              </section>
            </div>

            <div className="col-span-1 grid md:items-center md:grid-cols-2 lg:grid-cols-1 gap-16 w-full h-fit">
              <div className="w-full">
                <Heading text="Other Recipes" />
                <RecipeSideList />
              </div>
              <GreenCard />
            </div>
          </div>
        </section>

        <section className="hidden w-full lg:flex justify-center items-center mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(blogData.length / postsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
            customStyle="w-fit w-[95%] sm:w-[90%]"
          />
        </section>

        <div className="my-20">
          <Newsletter />
        </div>

        {showAddForm && (
          <AddBlog addNewBlog={addNewBlog} handleForm={handleCloseAddBlog} />
        )}

        {showEditForm && (
          <EditBlog
            handleForm={handleCloseEditForm}
            initialBlog={selectedBlog}
            editExistingBlog={editExistingBlog}
          />
        )}
      </div>
    </>
  );
}
