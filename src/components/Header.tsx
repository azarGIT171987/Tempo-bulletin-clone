import React from "react";
import { Search, User } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-white">
      <div className="container mx-auto px-4">
        {/* Top Navigation */}
        <div className="h-14 flex items-center justify-between border-b border-gray-100">
          <a href="/" className="text-red-600 text-xl font-semibold">
            Bulletin
          </a>

          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/stories"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Stories
            </a>
            <a
              href="/create"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Create
            </a>
            <a
              href="/community"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Community
            </a>
            <a
              href="/subscribe"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Subscribe
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Search className="h-5 w-5 text-gray-500" />
            <User className="h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* Welcome Message */}
        <div className="py-8 text-center">
          <h2 className="text-gray-900 text-sm font-medium mb-2">
            WELCOME TO BULLETIN
          </h2>
          <p className="text-lg">
            Craft narratives <span className="text-gray-400">that ignite</span>{" "}
            <span className="text-red-600">inspiration</span>,{" "}
            <span className="text-gray-400">and</span>{" "}
            <span className="text-red-600">entertainment</span>{" "}
            <span role="img" aria-label="entertainment">
              🎭
            </span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
