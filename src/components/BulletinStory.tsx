import React from "react";

const BulletinStory = () => {
  const stories = [
    { id: "1", icon: "🎬", label: "Movies", color: "bg-red-100" },
    { id: "2", icon: "✍️", label: "Essentials", color: "bg-blue-100" },
    { id: "3", icon: "🎮", label: "Gaming", color: "bg-purple-100" },
    { id: "4", icon: "👤", label: "About us", color: "bg-green-100" },
    { id: "5", icon: "🎯", label: "Goal", color: "bg-yellow-100" },
    { id: "6", icon: "🍎", label: "Apple", color: "bg-red-100" },
    { id: "7", icon: "📱", label: "Samsung", color: "bg-blue-100" },
    { id: "8", icon: "🌐", label: "IDN", color: "bg-green-100" },
    { id: "9", icon: "⭐", label: "Startups", color: "bg-yellow-100" },
    { id: "10", icon: "📱", label: "TikTok", color: "bg-purple-100" },
  ];

  return (
    <section className="container mx-auto px-4 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Bulletin Story</h2>
        <a href="/stories" className="text-red-600 text-sm hover:underline">
          See all →
        </a>
      </div>
      <div className="flex overflow-x-auto gap-8 pb-4">
        {stories.map((story) => (
          <div key={story.id} className="text-center flex-shrink-0">
            <div
              className={`w-16 h-16 rounded-full ${story.color} flex items-center justify-center text-2xl mb-2 mx-auto`}
            >
              {story.icon}
            </div>
            <span className="text-sm text-gray-600">{story.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BulletinStory;
