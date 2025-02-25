import React from "react";
import { Avatar } from "./ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedPost } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import LoadingSpinner from "./LoadingSpinner";

const FeaturedStory = () => {
  const { data: article, isLoading } = useQuery({
    queryKey: ["featuredPost"],
    queryFn: getFeaturedPost,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!article) {
    return null;
  }

  return (
    <article className="container mx-auto px-4 mb-12">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="aspect-[16/9] relative">
          <img
            src={
              article.image_url ||
              "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1400&h=800&fit=crop"
            }
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-2">
            <Avatar className="h-6 w-6">
              <img
                src={
                  article.authors?.profile_image_url ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${article.authors?.name}`
                }
                alt={article.authors?.name}
              />
            </Avatar>
            <span className="text-sm text-gray-600">
              {article.authors?.name}
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">
              {formatDistanceToNow(new Date(article.published_at), {
                addSuffix: true,
              })}
            </span>
          </div>
          <h2 className="text-2xl font-semibold mb-3">{article.title}</h2>
          {article.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
          )}
          <div className="flex items-center space-x-4">
            <span className="text-red-600 text-sm">
              {article.categories?.name}
            </span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-400 text-sm">4 min read</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedStory;
