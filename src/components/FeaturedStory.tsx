import React from "react";
import { Link } from "react-router-dom";
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
      <Link to={`/post/${article.id}`} className="block">
        <div className="bg-white overflow-hidden shadow-lg md:flex md:h-[400px] hover:shadow-xl transition-shadow">
          <div className="aspect-[16/9] relative md:aspect-auto md:w-1/2">
            <img
              src={
                article.image_url ||
                "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1400&h=800&fit=crop"
              }
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-1/2 md:flex md:flex-col">
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
            <h2 className="text-2xl font-semibold mb-3 hover:text-red-600 transition-colors">
              {article.title}
            </h2>
            {article.excerpt && (
              <p className="text-gray-600 mb-4 line-clamp-2">
                {article.excerpt}
              </p>
            )}
            <div className="flex items-center space-x-4 md:mt-auto">
              <span className="text-red-600 text-sm">
                {article.categories?.name}
              </span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">4 min read</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default FeaturedStory;
