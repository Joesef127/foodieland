import { useState, useEffect } from "react";
import {
  fetchBlogs,
  fetchBlogById,
  addBlog,
  editBlog,
  deleteBlog,
} from "./BlogCrud"; 
import { BlogCardProps } from "./Types"; 

const useBlog = () => {
  const [blogData, setBlogData] = useState<BlogCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  
  const fetchAllBlogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchBlogs();
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Blogs not found.");
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(`Unexpected error: ${response.statusText}`);
        }
      }
      const data: BlogCardProps[] = await response.json();
      setBlogData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while fetching blogs.");
      }
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  
  const fetchSingleBlog = async (id: number): Promise<BlogCardProps | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchBlogById(id);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Blog not found.");
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(`Unexpected error: ${response.statusText}`);
        }
      }
      const blog = await response.json();
      return blog;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while fetching the blog.");
      }
      console.error("Error fetching blog:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  
  const addNewBlog = async (blog: BlogCardProps): Promise<BlogCardProps | null> => {
    setError(null);
    try {
      const response = await addBlog(blog);
      if (!response.ok) {
        if (response.status === 422) {
          throw new Error("Validation error. Please check your input.");
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(`Unexpected error: ${response.statusText}`);
        }
      }
      const newBlog = await response.json();
      setBlogData((prevBlogs) => [...prevBlogs, newBlog]);
      return newBlog;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while adding the blog.");
      }
      console.error("Error adding blog:", error);
      return null;
    }
  };

  
  const editExistingBlog = async (
    id: number | undefined,
    blog: BlogCardProps
  ): Promise<BlogCardProps | void> => {
    setError(null);
    try {
      const response = await editBlog(id, blog);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Blog not found.");
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(`Unexpected error: ${response.statusText}`);
        }
      }
      const updatedBlog = await response.json();
      setBlogData((prevBlogs) =>
        prevBlogs.map((blog) => (blog.id === id ? updatedBlog : blog))
      );
      return updatedBlog;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while editing the blog.");
      }
      console.error("Error editing blog:", error);
    }
  };

  
  const deleteExistingBlog = async (id: number | undefined): Promise<boolean> => {
    setError(null);
    try {
      const response = await deleteBlog(id);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Blog not found.");
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(`Unexpected error: ${response.statusText}`);
        }
      }
      setBlogData((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while deleting the blog.");
      }
      console.error("Error deleting blog:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return {
    blogData,
    isLoading,
    error,
    fetchAllBlogs,
    fetchSingleBlog,
    addNewBlog,
    editExistingBlog,
    deleteExistingBlog,
  };
};

export default useBlog;