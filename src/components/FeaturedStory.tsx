import React from "react";
import { Avatar } from "./ui/avatar";

const FeaturedStory = () => {
  return (
    <article className="container mx-auto px-4 mb-12">
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="aspect-[16/9] relative">
          <img
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1400&h=800&fit=crop"
            alt="John Wick: Chapter 4"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Avatar className="h-6 w-6" />
            <span className="text-sm text-gray-600">Bulletin</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">12 minutes ago</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">
            Where To Watch 'John Wick: Chapter 4'
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-red-600 text-sm">Movies</span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-400 text-sm">4 min read</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedStory;
