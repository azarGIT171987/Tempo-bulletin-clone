import React from "react";
import { Avatar } from "./ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getLatestPosts } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import LoadingSpinner from "./LoadingSpinner";

const NewsGrid = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["latestPosts"],
    queryFn: getLatestPosts,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="container mx-auto px-4 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Latest News</h2>
        <a href="/news" className="text-red-600 text-sm hover:underline">
          See all →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles?.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-video relative">
              <img
                src={
                  article.image_url ||
                  `https://images.unsplash.com/photo-${article.id}?w=800&h=600&fit=crop`
                }
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <span className="text-red-600 text-sm mb-2 block">
                {article.categories?.name}
              </span>
              <h3 className="font-medium mb-3 line-clamp-2 hover:text-red-600 transition-colors cursor-pointer">
                {article.title}
              </h3>
              <div className="flex items-center space-x-2">
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
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NewsGrid;
