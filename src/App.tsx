import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import AdminPanel from "./components/admin/AdminPanel";
import BlogPost from "./components/BlogPost";
import CategoryPage from "./components/CategoryPage";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import routes from "tempo-routes";

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/post/:postId" element={<BlogPost />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
