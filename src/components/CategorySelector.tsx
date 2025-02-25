import React from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api";
import LoadingSpinner from "./LoadingSpinner";

interface CategorySelectorProps {
  onSelectCategory?: (category: { id: string; name: string }) => void;
}

const CategorySelector = ({
  onSelectCategory = () => {},
}: CategorySelectorProps) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full h-[100px] bg-white border-b border-gray-200 py-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 px-4">
          {categories?.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100`}
              onClick={() => onSelectCategory(category)}
            >
              <span className="text-xl">{category.icon || "📄"}</span>
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
