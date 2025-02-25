import React from "react";
import { Avatar } from "./ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getMustReadPosts } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";

const MustRead = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["mustReadPosts"],
    queryFn: getMustReadPosts,
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <section className="container mx-auto px-4 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Must Read</h2>
        <a href="/must-read" className="text-red-600 text-sm hover:underline">
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
                  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
                }
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2 line-clamp-2">{article.title}</h3>
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

export default MustRead;
