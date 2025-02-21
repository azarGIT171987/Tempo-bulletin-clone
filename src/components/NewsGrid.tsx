import React from "react";
import { Avatar } from "./ui/avatar";

const NewsGrid = () => {
  const articles = [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1541744573515-478c959628a0?w=800&h=600&fit=crop",
      category: "Sports",
      title: "He deserves a lot more: Verstappen backs Ricciardo",
      author: "John Doe",
      timeAgo: "2 hours ago",
      readTime: "3 min read",
    },
    {
      id: "2",
      imageUrl:
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=600&fit=crop",
      category: "Sports",
      title: "Liverpool hammer rivals for first win in Premier League",
      author: "Jane Smith",
      timeAgo: "3 hours ago",
      readTime: "4 min read",
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
      category: "News",
      title: "Papua: At least one killed in fresh fuel depot fire",
      author: "Mike Wilson",
      timeAgo: "4 hours ago",
      readTime: "5 min read",
    },
    {
      id: "4",
      imageUrl:
        "https://images.unsplash.com/photo-1557804483-ef3ae78eca57?w=800&h=600&fit=crop",
      category: "News",
      title: "Jeremy Bowen: Israel's nuclear arsenal is dead",
      author: "Sarah Lee",
      timeAgo: "5 hours ago",
      readTime: "6 min read",
    },
  ];

  return (
    <section className="container mx-auto px-4 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Latest News</h2>
        <a href="/news" className="text-red-600 text-sm hover:underline">
          See all →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div className="flex items-center space-x-2 mb-2">
                <Avatar className="h-6 w-6" />
                <span className="text-sm text-gray-600">{article.author}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-400">{article.timeAgo}</span>
              </div>
              <h3 className="font-medium mb-2 line-clamp-2">{article.title}</h3>
              <div className="flex items-center space-x-4">
                <span className="text-red-600 text-sm">{article.category}</span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-400 text-sm">
                  {article.readTime}
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
