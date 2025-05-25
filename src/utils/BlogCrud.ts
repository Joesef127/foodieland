import { BlogCardProps } from "./Types";
import { BaseUrl } from "./Utils";

// Fetch all blogs
export const fetchBlogs = (): Promise<Response> => {
  return fetch(`${BaseUrl}blogs/`);
};

// Fetch a single blog by ID
export const fetchBlogById = (id: number | undefined): Promise<Response> => {
  return fetch(`${BaseUrl}blogs/${id}`);
};

// Add a new blog
export const addBlog = (blog: BlogCardProps): Promise<Response> => {
  return fetch(`${BaseUrl}blogs/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  });
};

// Edit an existing blog
export const editBlog = (
  id: number | undefined,
  blog: BlogCardProps
): Promise<Response> => {
  return fetch(`${BaseUrl}blogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  });
};

// Delete a blog
export const deleteBlog = (id: number | undefined): Promise<Response> => {
  return fetch(`${BaseUrl}blogs/${id}`, {
    method: "DELETE",
  });
};