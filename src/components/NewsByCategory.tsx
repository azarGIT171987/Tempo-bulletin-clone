import React, {
  useMemo,
  memo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Virtual } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Avatar } from "./ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getPostsByCategory } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ErrorBoundary from "./ErrorBoundary";

const ITEMS_PER_PAGE = 12;

interface NewsByCategoryProps {
  category: string;
}

interface Category {
  id?: string;
  name: string;
}

interface Author {
  id?: string;
  name: string;
  profile_image_url?: string;
}

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  category_id: string;
  author_id: string;
  is_featured: boolean;
  is_editors_pick: boolean;
  is_must_read: boolean;
  published_at: string;
  created_at: string;
  categories: Category[];
  authors: Author[];
}

const ArticleSkeleton = () => (
  <div className="bg-white overflow-hidden shadow-sm h-full flex flex-col animate-pulse">
    <div className="relative h-48 bg-gray-200" />
    <div className="p-4 flex flex-col flex-1">
      <div className="h-4 bg-gray-200 w-24 mb-2" />
      <div className="h-4 bg-gray-200 w-full mb-2" />
      <div className="h-4 bg-gray-200 w-3/4 mb-3" />
      <div className="flex items-center space-x-2 mt-auto">
        <div className="h-6 w-6 rounded-full bg-gray-200" />
        <div className="h-4 bg-gray-200 w-24" />
      </div>
    </div>
  </div>
);

const ArticleCard = memo(
  ({
    article,
    onIntersect,
  }: {
    article: Article;
    onIntersect?: () => void;
  }) => {
    const cardRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && onIntersect) {
            onIntersect();
          }
        },
        { threshold: 0.1 }
      );

      if (cardRef.current) {
        observer.observe(cardRef.current);
      }

      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current);
        }
      };
    }, [onIntersect]);

    return (
      <article
        ref={cardRef}
        className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col"
      >
        <div className="relative h-48">
          <img
            src={
              article.image_url ||
              `https://images.unsplash.com/photo-${article.id}?w=800&h=600&fit=crop`
            }
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
            width={800}
            height={600}
            onError={(e) => {
              e.currentTarget.src = "/fallback-image.jpg";
            }}
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <span className="text-red-600 text-sm mb-2 block">
            {article.categories?.name || "Uncategorized"}
          </span>
          <h3 className="font-medium mb-3 line-clamp-2 hover:text-red-600 transition-colors cursor-pointer flex-1 min-h-[3rem]">
            {article.title || "Untitled"}
          </h3>
          <div className="flex items-center space-x-2 mt-auto">
            <Avatar className="h-6 w-6">
              <img
                src={
                  article.authors?.profile_image_url ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${
                    article.authors?.name || "Guest"
                  }`
                }
                alt={article.categories?.name || "Anonymous"}
                width={24}
                height={24}
              />
            </Avatar>
            <span className="text-sm text-gray-600">
              {article.authors?.name || "Unknown Author"}
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">
              {article.published_at
                ? formatDistanceToNow(new Date(article.published_at), {
                    addSuffix: true,
                  })
                : "Unknown Date"}
            </span>
          </div>
        </div>
      </article>
    );
  }
);

const NewsByCategory = ({ category = "Business" }: NewsByCategoryProps) => {
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categoryNews", category],
    queryFn: async () => {
      const data = await getPostsByCategory(category);
      return data as Article[];
    },
    staleTime: 5 * 60 * 1000,
  });

  const uniqueArticles = useMemo(
    () =>
      Array.from(
        new Map(articles?.map((article) => [article.title, article])).values()
      ),
    [articles]
  );

  const loadMore = useCallback(() => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  }, []);

  const swiperConfig = {
    modules: [Navigation, Autoplay, Virtual],
    spaceBetween: 24,
    slidesPerView: 1,
    autoplay: { delay: 5000, disableOnInteraction: false },
    navigation: {
      prevEl: ".swiper-button-prev-custom-mr",
      nextEl: ".swiper-button-next-custom-mr",
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    },
    lazy: true,
    watchSlidesProgress: true,
    virtual: true,
  };

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        An error occurred while loading the news.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ArticleSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <section className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Must Read</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="swiper-button-prev-custom-mr p-1 rounded-full border border-gray-200 hover:border-red-600 hover:text-red-600 transition-colors">
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button className="swiper-button-next-custom-mr p-1 rounded-full border border-gray-200 hover:border-red-600 hover:text-red-600 transition-colors">
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
            <a href="/news" className="text-red-600 text-sm hover:underline">
              See all →
            </a>
          </div>
        </div>
        <Swiper {...swiperConfig} className="w-full">
          {uniqueArticles?.slice(0, visibleItems).map((article, index) => (
            <SwiperSlide key={article.id} virtualIndex={index}>
              <ArticleCard
                article={article}
                onIntersect={
                  index === visibleItems - ITEMS_PER_PAGE / 2
                    ? loadMore
                    : undefined
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </ErrorBoundary>
  );
};

export default memo(NewsByCategory);
