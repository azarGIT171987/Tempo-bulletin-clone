import React from "react";
import { Avatar } from "./ui/avatar";

const TopCreators = () => {
  const creators = [
    {
      id: "1",
      name: "Alex Young",
      followers: "23.5K",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    {
      id: "2",
      name: "Joe Allen",
      followers: "18.2K",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joe",
    },
    {
      id: "3",
      name: "Alexa Timber",
      followers: "15.7K",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexa",
    },
    {
      id: "4",
      name: "Ashley Star",
      followers: "12.9K",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ashley",
    },
  ];

  return (
    <section className="container mx-auto px-4 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Top Creator</h2>
        <a href="/creators" className="text-red-600 text-sm hover:underline">
          See all →
        </a>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {creators.map((creator) => (
          <div key={creator.id} className="text-center">
            <Avatar className="w-16 h-16 mb-2 mx-auto ring-2 ring-red-600 ring-offset-2">
              <img src={creator.avatar} alt={creator.name} />
            </Avatar>
            <h3 className="font-medium text-sm mb-1">{creator.name}</h3>
            <span className="text-sm text-gray-500">
              {creator.followers} followers
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCreators;
