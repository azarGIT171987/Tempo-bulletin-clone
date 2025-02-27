import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostsByCategory } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ChevronRight } from "lucide-react";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categoryPosts", categoryName],
    queryFn: async () => {
      if (!categoryName) return [];
      return getPostsByCategory(categoryName);
    },
    enabled: !!categoryName,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !posts || posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">No Posts Found</h2>
          <p className="text-gray-600 mb-6">
            {error
              ? "An error occurred while loading posts."
              : `No posts found in the ${categoryName} category.`}
          </p>
          <Link to="/" className="text-red-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

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
            <span className="text-gray-900">{categoryName}</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
            <p className="text-gray-600">
              Explore our latest articles in the {categoryName} category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link to={`/post/${post.id}`} className="block">
                  <div className="aspect-video w-full relative">
                    <img
                      src={
                        post.image_url ||
                        `https://images.unsplash.com/photo-${post.id}?w=600&h=400&fit=crop`
                      }
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    {(post.is_featured ||
                      post.is_editors_pick ||
                      post.is_must_read) && (
                      <div className="absolute top-2 left-2 flex gap-1">
                        {post.is_featured && (
                          <Badge className="bg-blue-500">Featured</Badge>
                        )}
                        {post.is_editors_pick && (
                          <Badge className="bg-purple-500">Editor's Pick</Badge>
                        )}
                        {post.is_must_read && (
                          <Badge className="bg-amber-500">Must Read</Badge>
                        )}
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <Link to={`/post/${post.id}`} className="block">
                    <h2 className="text-xl font-semibold mb-2 hover:text-red-600 transition-colors">
                      {post.title}
                    </h2>
                  </Link>

                  {post.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <img
                          src={
                            post.authors?.profile_image_url ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authors?.name}`
                          }
                          alt={post.authors?.name}
                        />
                      </Avatar>
                      <span className="text-sm text-gray-600">
                        {post.authors?.name}
                      </span>
                    </div>

                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(post.published_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default CategoryPage;
