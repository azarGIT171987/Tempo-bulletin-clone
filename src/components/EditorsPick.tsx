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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {mainArticle && (
          <div className="lg:col-span-2 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full relative">
            <div className="h-full relative">
              <img
                src={
                  mainArticle.image_url ||
                  "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=800&fit=crop"
                }
                alt={mainArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <span className="text-red-400 text-sm mb-2 block">
                  {mainArticle.categories?.name}
                </span>
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                  {mainArticle.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6 ring-2 ring-white">
                    <img
                      src={
                        mainArticle.authors?.profile_image_url ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${mainArticle.authors?.name}`
                      }
                      alt={mainArticle.authors?.name}
                    />
                  </Avatar>
                  <span className="text-sm text-gray-200">
                    {mainArticle.authors?.name}
                  </span>
                  <span className="text-sm text-gray-300">•</span>
                  <span className="text-sm text-gray-300">
                    {formatDistanceToNow(new Date(mainArticle.published_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="h-full space-y-4 overflow-y-auto will-change-scroll overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
          {sideArticles?.map((article) => (
            <article
              key={article.id}
              className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow flex min-h-[100px] transform-gpu"
            >
              <div className="w-1/3">
                <img
                  loading="lazy"
                  decoding="async"
                  src={
                    article.image_url ||
                    `https://images.unsplash.com/photo-${article.id}?w=300&h=300&fit=crop`
                  }
                  alt={article.title}
                  className="w-full h-full object-cover"
                  width={300}
                  height={300}
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
