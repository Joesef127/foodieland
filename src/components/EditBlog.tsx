import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import RichTextEditor from "./RichTextEditor";
import { BlogCardProps } from "../utils/Types";

export default function EditBlog({
  handleForm,
  initialBlog,
  editExistingBlog,
}: {
  handleForm: () => void;
  initialBlog: BlogCardProps | null;
  editExistingBlog: (
    id: number,
    updatedBlog: BlogCardProps
  ) => Promise<void | BlogCardProps>;
}) {
  const [error, setError] = useState<string>("");
  const [blog, setBlog] = useState<BlogCardProps>(
    initialBlog || {
      id: 0,
      title: "",
      author: "",
      content: "",
      excerpt: "",
      image: "",
    }
  );

  async function handleEditBlog(e: React.FormEvent) {
    e.preventDefault();
    if (blog.title && blog.excerpt && blog.image && blog.content) {
      if (blog.id) {
        await editExistingBlog(blog.id, blog);
      }
      handleForm();
    } else {
      setError("Please fill out all fields");
    }
  }

  return (
    <Dialog open={true} onClose={handleForm} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[80%]">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Edit Blog
                  </DialogTitle>
                  <p className="mt-1 text-sm text-gray-600">
                    Please update the form below to edit the blog.
                  </p>
                </div>
              </div>
            </div>

            {error && <p className="py-2 text-center text-red-500">{error}</p>}

            <form className="bg-white px-4 sm:px-6" onSubmit={handleEditBlog}>
              <div className="mt-5 w-full">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="blog-title"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Title <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="blog-title"
                      name="blog-title"
                      type="text"
                      value={blog.title}
                      onChange={(e) =>
                        setBlog({ ...blog, title: e.target.value })
                      }
                      placeholder="Blog title"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4 mt-4">
                  <label
                    htmlFor="blog-excerpt"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Excerpt <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="blog-excerpt"
                      name="blog-excerpt"
                      value={blog.excerpt}
                      onChange={(e) =>
                        setBlog({ ...blog, excerpt: e.target.value })
                      }
                      placeholder="Short description of the blog"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4 mt-4">
                  <label
                    htmlFor="blog-author"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Author <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="blog-author"
                      name="blog-author"
                      type="text"
                      value={blog.author}
                      onChange={(e) =>
                        setBlog({ ...blog, author: e.target.value })
                      }
                      placeholder="Author name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4 mt-4">
                  <label
                    htmlFor="blog-image-url"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Image URL
                  </label>
                  <div className="mt-2">
                    <input
                      id="blog-image-url"
                      name="blog-image-url"
                      type="url"
                      value={blog.image}
                      onChange={(e) =>
                        setBlog({ ...blog, image: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4 mt-4">
                  <label
                    htmlFor="blog-content"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Content <span className="text-red-500">*</span>
                  </label>
                  <RichTextEditor
                    onChange={
                      (content) => setBlog({ ...blog, content }) 
                    }
                    initialContent={blog.content} 
                  />
                </div>
              </div>

              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleForm}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
