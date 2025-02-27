import { supabase } from "./supabase";
import { Post, Category, Author } from "./supabase";

export async function getFeaturedPost() {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      categories:category_id(*),
      authors:author_id(*)
    `,
    )
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return data;
}

export async function getLatestPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      categories:category_id(*),
      authors:author_id(*)
    `,
    )
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getMustReadPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      categories:category_id(*),
      authors:author_id(*)
    `,
    )
    .eq("is_must_read", true)
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getEditorsPickPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      categories:category_id(*),
      authors:author_id(*)
    `,
    )
    .eq("is_editors_pick", true)
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) throw error;
  return data;
}

export async function getPostsByCategory(categoryName: string) {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      categories:category_id!inner(*),
      authors:author_id(*)
    `,
    )
    .eq("categories.name", categoryName)
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getPostById(postId: string) {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      categories:category_id(*),
      authors:author_id(*)
    `,
    )
    .eq("id", postId)
    .single();

  if (error) throw error;
  return data;
}

export async function getRelatedPosts(
  categoryId: string,
  currentPostId: string,
  limit = 3,
) {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      categories:category_id(*),
      authors:author_id(*)
    `,
    )
    .eq("category_id", categoryId)
    .neq("id", currentPostId)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getCommentsByPostId(postId: string) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addComment(comment: {
  post_id: string;
  name: string;
  email?: string;
  content: string;
}) {
  const { data, error } = await supabase.from("comments").insert(comment);
  if (error) throw error;
  return data;
}

export async function getTopAuthors() {
  const { data, error } = await supabase.from("authors").select("*");

  if (error) throw error;
  return data;
}
