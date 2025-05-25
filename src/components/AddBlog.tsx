import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import RichTextEditor from "./RichTextEditor";
import useBlog from "../utils/useBlog"; // Import the useBlog hook

export default function AddBlog({ handleForm }: { handleForm: () => void }) {
  const { addNewBlog } = useBlog(); // Use the addNewBlog function from the hook
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [excerpt, setExcerpt] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  // Handle form submission
  async function handleAddBlog(e: React.FormEvent) {
    e.preventDefault();

    // Validate required fields
    if (!title || !excerpt || !content) {
      setError("Please fill out all required fields.");
      return;
    }

    const newBlog = {
      title,
      excerpt,
      date: new Date().toISOString(), // Auto-generate the date
      content,
      imageUrl: imageUrl || undefined, // Optional field
    };

    try {
      await addNewBlog(newBlog); // Use the addNewBlog function to save the blog
      setTitle("");
      setExcerpt("");
      setContent("");
      setImageUrl("");
      setError(""); // Clear any previous errors
      handleForm(); // Close the modal
    } catch (err) {
      console.error("Error adding blog:", err);
      setError("An error occurred while adding the blog. Please try again.");
    }
  }

  return (
    <Dialog open={true} onClose={handleForm} className="relative z-50">
      {/* Dark overlay background */}
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      {/* Modal container */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[80%]">
            {/* Modal header */}
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Add Blog
                  </DialogTitle>
                  <p className="mt-1 text-sm text-gray-600">
                    Please fill out the form below to add a new blog.
                  </p>
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && <p className="py-2 text-center text-red-500">{error}</p>}

            {/* Modal form */}
            <form className="bg-white px-4 sm:px-6" onSubmit={handleAddBlog}>
              <div className="mt-5 w-full">
                {/* Blog Title */}
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Blog title"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Blog Excerpt */}
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
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Short description of the blog"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Blog Image URL */}
                <div className="sm:col-span-4 mt-4">
                  <label
                    htmlFor="blog-image-url"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Image URL (Optional)
                  </label>
                  <div className="mt-2">
                    <input
                      id="blog-image-url"
                      name="blog-image-url"
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Blog Content (Rich Text Editor) */}
                <div className="sm:col-span-4 mt-4">
                  <label
                    htmlFor="blog-content"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Content <span className="text-red-500">*</span>
                  </label>
                  <RichTextEditor onChange={setContent} />
                </div>
              </div>

              {/* Modal actions */}
              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                >
                  Add Blog
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