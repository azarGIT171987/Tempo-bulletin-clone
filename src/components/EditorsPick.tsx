import React from "react";
import { Avatar } from "./ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getEditorsPickPosts } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";

const EditorsPick = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["editorsPickPosts"],
    queryFn: getEditorsPickPosts,
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  const mainArticle = articles?.[0];
  const sideArticles = articles?.slice(1);

  return (
    <section className="container mx-auto px-4 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Editor's Pick</h2>
        <a
          href="/editors-pick"
          className="text-red-600 text-sm hover:underline"
        >
          See all →
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mainArticle && (
          <div className="lg:col-span-2 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[16/9] relative">
              <img
                src={
                  mainArticle.image_url ||
                  "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=800&fit=crop"
                }
                alt={mainArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="text-red-600 text-sm mb-2 block">
                {mainArticle.categories?.name}
              </span>
              <h3 className="text-xl font-semibold mb-2">
                {mainArticle.title}
              </h3>
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <img
                    src={
                      mainArticle.authors?.profile_image_url ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${mainArticle.authors?.name}`
                    }
                    alt={mainArticle.authors?.name}
                  />
                </Avatar>
                <span className="text-sm text-gray-600">
                  {mainArticle.authors?.name}
                </span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-400">
                  {formatDistanceToNow(new Date(mainArticle.published_at), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {sideArticles?.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex"
            >
              <div className="w-1/3">
                <img
                  src={
                    article.image_url ||
                    `https://images.unsplash.com/photo-${article.id}?w=300&h=300&fit=crop`
                  }
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-4">
                <h4 className="font-medium mb-2 line-clamp-2 text-sm">
                  {article.title}
                </h4>
                <span className="text-sm text-gray-400">
                  {formatDistanceToNow(new Date(article.published_at), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorsPick;
