import { Routes, Route } from "react-router-dom";
import { SiteHeader, SiteFooter } from "./components/SiteChrome";
import HomePage from "./pages/HomePage";
import TrailsPage from "./pages/TrailsPage";
import TrailDetailPage from "./pages/TrailDetailPage";
import RentalsPage from "./pages/RentalsPage";
import LapinSatuPage from "./pages/LapinSatuPage";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trails" element={<TrailsPage />} />
          <Route path="/trails/:trailId" element={<TrailDetailPage />} />
          <Route path="/rentals" element={<RentalsPage />} />
          <Route path="/lapin-satu" element={<LapinSatuPage />} />
          <Route path="*" element={
            <div className="mx-auto max-w-2xl px-4 py-24 text-center">
              <h1 className="text-7xl font-bold text-foreground">404</h1>
              <p className="mt-4 text-muted-foreground">Page not found</p>
              <a href="/" className="mt-6 inline-block text-primary hover:underline">Go home</a>
            </div>
          } />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}
