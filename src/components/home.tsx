import React from "react";
import Header from "./Header";
import FeaturedStory from "./FeaturedStory";
import NewsGrid from "./NewsGrid";
import BulletinStory from "./BulletinStory";
import MustRead from "./MustRead";
import EditorsPick from "./EditorsPick";
import NewsByCategory from "./NewsByCategory";
import TopCreators from "./TopCreators";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <FeaturedStory />
        <NewsGrid />
        <BulletinStory />
        <MustRead />
        <EditorsPick />
        <NewsByCategory />
        <TopCreators />

        {/* Newsletter Section */}
        <section className="container mx-auto px-4 mb-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Get First Update</h2>
          <p className="text-gray-600 mb-6">
            Get the news in front line by subscribing our latest updates
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </section>
      </main>

      <footer className="bg-white py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-red-600 text-xl font-semibold mb-4">
                Bulletin
              </h3>
              <p className="text-sm text-gray-600">
                Empowering creators with knowledge and entertainment
              </p>
            </div>
            {[
              {
                title: "Business",
                links: ["Market", "Business", "Economy", "Money"],
              },
              {
                title: "Technology",
                links: ["Gadget", "Mobile", "Startup", "Future Tech"],
              },
              {
                title: "Entertainment",
                links: ["Movies", "Music", "Television", "Lifestyle"],
              },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
