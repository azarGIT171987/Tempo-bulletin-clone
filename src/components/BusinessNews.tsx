import React from "react";
import { Avatar } from "./ui/avatar";

const BusinessNews = () => {
  const articles = [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
      title: "Fresh producers turn to next winter crops of their farming",
      author: "John Smith",
      timeAgo: "2 hours ago",
    },
    {
      id: "2",
      imageUrl:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop",
      title: "Low employee engagement? Managers can help turn it around",
      author: "Sarah Johnson",
      timeAgo: "3 hours ago",
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop",
      title: "'We need to stop': Guardiola hits back at Man United",
      author: "Mike Wilson",
      timeAgo: "4 hours ago",
    },
    {
      id: "4",
      imageUrl:
        "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=600&fit=crop",
      title: "Emma Raducanu's former coach Dmitry says he has 'no regrets'",
      author: "Alex Brown",
      timeAgo: "5 hours ago",
    },
  ];

  return (
    <section className="container mx-auto px-4 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Business</h2>
        <a href="/business" className="text-red-600 text-sm hover:underline">
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
              <h3 className="font-medium mb-2 line-clamp-2 text-sm">
                {article.title}
              </h3>
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

export default BusinessNews;
