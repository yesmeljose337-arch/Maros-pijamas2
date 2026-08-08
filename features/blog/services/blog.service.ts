import { mockBlogPosts } from "../mocks/blog.mock";
import type { BlogPost } from "../types";

let store: BlogPost[] = [...mockBlogPosts];

function delay<T>(data: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return delay([...store].sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1)));
}

export async function createBlogPost(data: Omit<BlogPost, "id">): Promise<BlogPost> {
  const newPost: BlogPost = { ...data, id: `b${Date.now()}` };
  store = [newPost, ...store];
  return delay(newPost);
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost | undefined> {
  store = store.map((post) => (post.id === id ? { ...post, ...data } : post));
  return delay(store.find((post) => post.id === id));
}

export async function deleteBlogPost(id: string): Promise<void> {
  store = store.filter((post) => post.id !== id);
  return delay(undefined);
}