import React from "react";
import { Avatar } from "./ui/avatar";

const MustRead = () => {
  const articles = [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
      title: "Ukraine's silence along Russia's front hints",
      author: "BBC News",
      timeAgo: "3 hours ago",
    },
    {
      id: "2",
      imageUrl:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      title: "Taylor Swift is sending a powerful message to women",
      author: "Entertainment Weekly",
      timeAgo: "5 hours ago",
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
      title: "Inside Qatar's city of the future",
      author: "Tech Review",
      timeAgo: "6 hours ago",
    },
  ];

  return (
    <section className="container mx-auto px-4 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Must Read</h2>
        <a href="/must-read" className="text-red-600 text-sm hover:underline">
          See all →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-video relative">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2 line-clamp-2">{article.title}</h3>
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6" />
                <span className="text-sm text-gray-600">{article.author}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-400">{article.timeAgo}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MustRead;
