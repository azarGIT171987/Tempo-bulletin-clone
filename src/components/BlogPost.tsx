import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { formatDistanceToNow } from "date-fns";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import {
  ChevronRight,
  Share2,
  MessageSquare,
  Calendar,
  Clock,
} from "lucide-react";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";

interface Comment {
  id: string;
  post_id: string;
  name: string;
  email?: string;
  content: string;
  created_at: string;
}

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const queryClient = useQueryClient();
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [formError, setFormError] = useState("");

  // Fetch post data
  const {
    data: post,
    isLoading: isPostLoading,
    error: postError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
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
    },
    enabled: !!postId,
  });

  // Fetch related posts
  const { data: relatedPosts, isLoading: isRelatedLoading } = useQuery({
    queryKey: ["relatedPosts", post?.category_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          categories:category_id(*),
          authors:author_id(*)
        `,
        )
        .eq("category_id", post?.category_id)
        .neq("id", postId)
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
    enabled: !!post?.category_id,
  });

  // Fetch comments
  const {
    data: comments,
    isLoading: isCommentsLoading,
    error: commentsError,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Comment[];
    },
    enabled: !!postId,
  });

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: async (comment: {
      post_id: string;
      name: string;
      email?: string;
      content: string;
    }) => {
      const { data, error } = await supabase.from("comments").insert(comment);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setCommentForm({ name: "", email: "", content: "" });
    },
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!commentForm.name.trim() || !commentForm.content.trim()) {
      setFormError("Name and comment are required");
      return;
    }

    addCommentMutation.mutate({
      post_id: postId!,
      name: commentForm.name.trim(),
      email: commentForm.email.trim() || undefined,
      content: commentForm.content.trim(),
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCommentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (isPostLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Post Not Found</h2>
          <p className="text-gray-600 mb-6">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const readTime = Math.max(1, Math.ceil(post.content.split(" ").length / 200));

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-gray-900">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link
              to={`/category/${post.categories?.name}`}
              className="hover:text-gray-900"
            >
              {post.categories?.name}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Featured Image */}
                <div className="aspect-video w-full relative">
                  <img
                    src={
                      post.image_url ||
                      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=630&fit=crop"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Header */}
                <div className="p-6 border-b">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge
                      variant="secondary"
                      className="bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      {post.categories?.name}
                    </Badge>
                    {post.is_featured && (
                      <Badge
                        variant="outline"
                        className="border-blue-300 text-blue-600"
                      >
                        Featured
                      </Badge>
                    )}
                    {post.is_editors_pick && (
                      <Badge
                        variant="outline"
                        className="border-purple-300 text-purple-600"
                      >
                        Editor's Pick
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold mb-4">
                    {post.title}
                  </h1>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10 border-2 border-white">
                        <img
                          src={
                            post.authors?.profile_image_url ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authors?.name}`
                          }
                          alt={post.authors?.name}
                        />
                      </Avatar>
                      <div>
                        <p className="font-medium">{post.authors?.name}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.published_at).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {readTime} min read
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <div className="prose prose-lg max-w-none">
                    {post.content.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </article>

              {/* Comments Section */}
              <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Comments {comments?.length ? `(${comments.length})` : ""}
                </h2>

                <form onSubmit={handleCommentSubmit} className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={commentForm.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email (optional)
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={commentForm.email}
                        onChange={handleInputChange}
                        placeholder="Your email"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Comment *
                    </label>
                    <Textarea
                      id="content"
                      name="content"
                      value={commentForm.content}
                      onChange={handleInputChange}
                      placeholder="Share your thoughts..."
                      rows={4}
                      required
                    />
                  </div>

                  {formError && (
                    <p className="text-red-500 text-sm mb-4">{formError}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={addCommentMutation.isPending}
                    className="w-full md:w-auto"
                  >
                    {addCommentMutation.isPending
                      ? "Posting..."
                      : "Post Comment"}
                  </Button>
                </form>

                <Separator className="my-6" />

                {isCommentsLoading ? (
                  <LoadingSpinner />
                ) : comments?.length ? (
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-gray-50 p-4 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{comment.name}</h3>
                          <span className="text-sm text-gray-500">
                            {formatDistanceToNow(new Date(comment.created_at), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related Posts */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Related Posts</h2>

                {isRelatedLoading ? (
                  <LoadingSpinner />
                ) : relatedPosts?.length ? (
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <div key={relatedPost.id} className="flex gap-3">
                        <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
                          <img
                            src={
                              relatedPost.image_url ||
                              `https://images.unsplash.com/photo-${relatedPost.id}?w=100&h=100&fit=crop`
                            }
                            alt={relatedPost.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm line-clamp-2 hover:text-red-600 transition-colors">
                            <Link to={`/post/${relatedPost.id}`}>
                              {relatedPost.title}
                            </Link>
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(
                              relatedPost.published_at,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No related posts found
                  </p>
                )}
              </div>

              {/* Newsletter Signup */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-2">Subscribe</h2>
                <p className="text-gray-600 text-sm mb-4">
                  Get the latest posts delivered right to your inbox
                </p>

                <form className="space-y-3">
                  <Input
                    placeholder="Your email address"
                    type="email"
                    required
                  />
                  <Button className="w-full">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default BlogPost;
