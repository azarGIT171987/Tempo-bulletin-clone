import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, BookOpen } from "lucide-react";

interface NewsCardProps {
  imageUrl?: string;
  category?: string;
  headline?: string;
  timestamp?: string;
  readTime?: number;
}

const NewsCard = ({
  imageUrl = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=60",
  category = "Technology",
  headline = "The Future of AI in Modern Technology",
  timestamp = "2 hours ago",
  readTime = 5,
}: NewsCardProps) => {
  return (
    <Card className="w-[360px] h-[420px] overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={headline}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <Badge
          className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white"
          variant="secondary"
        >
          {category}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-2 hover:text-red-600 transition-colors cursor-pointer">
          {headline}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{timestamp}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{readTime} min read</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
