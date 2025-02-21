import React from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface CategorySelectorProps {
  categories?: Category[];
  onSelectCategory?: (category: Category) => void;
}

const CategorySelector = ({
  categories = [
    {
      id: "1",
      name: "World",
      icon: "🌍",
      color: "bg-blue-100",
    },
    {
      id: "2",
      name: "Business",
      icon: "💼",
      color: "bg-green-100",
    },
    {
      id: "3",
      name: "Technology",
      icon: "💻",
      color: "bg-purple-100",
    },
    {
      id: "4",
      name: "Entertainment",
      icon: "🎬",
      color: "bg-pink-100",
    },
    {
      id: "5",
      name: "Sports",
      icon: "⚽",
      color: "bg-orange-100",
    },
    {
      id: "6",
      name: "Science",
      icon: "🔬",
      color: "bg-teal-100",
    },
    {
      id: "7",
      name: "Health",
      icon: "⚕️",
      color: "bg-red-100",
    },
  ],
  onSelectCategory = () => {},
}: CategorySelectorProps) => {
  return (
    <div className="w-full h-[100px] bg-white border-b border-gray-200 py-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 px-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${category.color} hover:bg-opacity-80`}
              onClick={() => onSelectCategory(category)}
            >
              <span className="text-xl">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default CategorySelector;
