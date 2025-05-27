import { BlogCardProps } from "./Types";
import { BaseUrl } from "./Utils";

export const fetchBlogs = (): Promise<Response> => {
  return fetch(`${BaseUrl}blogs/`);
};

export const fetchBlogById = (id: number | undefined): Promise<Response> => {
  return fetch(`${BaseUrl}blogs/${id}`);
};

export const addBlog = (blog: BlogCardProps): Promise<Response> => {
  return fetch(`${BaseUrl}blogs/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  });
};

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

export const deleteBlog = (id: number | undefined): Promise<Response> => {
  return fetch(`${BaseUrl}blogs/${id}`, {
    method: "DELETE",
  });
};
