import React from "react";
import { Avatar } from "./ui/avatar";

const EditorsPick = () => {
  const mainArticle = {
    imageUrl:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=800&fit=crop",
    title: "All the rumors about the iPhone 15, expected in 2023",
    category: "Technology",
    timeAgo: "2 hours ago",
  };

  const sideArticles = [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=600&fit=crop",
      title:
        "Rio de Janeiro: The world's first 'smart city' welcomes digital nomads",
      timeAgo: "3 hours ago",
    },
    {
      id: "2",
      imageUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      title: "ChatGPT: How generative AI could change living as we know it",
      timeAgo: "4 hours ago",
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=600&fit=crop",
      title: "Disney+ gives fake accounts verified status",
      timeAgo: "5 hours ago",
    },
    {
      id: "4",
      imageUrl:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop",
      title: "First editions from 1823 goes on display",
      timeAgo: "6 hours ago",
    },
  ];

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
        {/* Main Article */}
        <div className="lg:col-span-2 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-[16/9] relative">
            <img
              src={mainArticle.imageUrl}
              alt={mainArticle.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <span className="text-red-600 text-sm mb-2 block">
              {mainArticle.category}
            </span>
            <h3 className="text-xl font-semibold mb-2">{mainArticle.title}</h3>
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6" />
              <span className="text-sm text-gray-600">Tech Review</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-400">
                {mainArticle.timeAgo}
              </span>
            </div>
          </div>
        </div>

        {/* Side Articles */}
        <div className="space-y-4">
          {sideArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex"
            >
              <div className="w-1/3">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-4">
                <h4 className="font-medium mb-2 line-clamp-2 text-sm">
                  {article.title}
                </h4>
                <span className="text-sm text-gray-400">{article.timeAgo}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorsPick;
