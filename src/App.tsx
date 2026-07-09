import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ProductsView from "./components/ProductsView";
import ExportView from "./components/ExportView";
import ProductDetailView from "./components/ProductDetailView";
import BrandsView from "./components/BrandsView";
import RecipesView from "./components/RecipesView";
import RecipeDetailView from "./components/RecipeDetailView";
import QuotationModal from "./components/QuotationModal";
import LoginPage from "./components/Admin/LoginPage";
import Dashboard from "./components/Admin/Dashboard";
import Toaster from "./components/Admin/Toaster";
import { AdminDataProvider } from "./context/AdminDataContext";
import { Router, matchPath, ROUTES, useRouter } from "./lib/router";
import {
  isAdminAuthenticated,
  setAdminAuthenticated,
  clearAdminAuthenticated,
} from "./lib/adminAuth";

function AppContent() {
  const { path, navigate } = useRouter();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [toaster, setToaster] = useState<{ message: string; subMessage?: string } | null>(null);

  const isAdminLogin = path === ROUTES.adminLogin;
  const isAdminDashboard = path === ROUTES.adminDashboard;
  const isAdminRoute = isAdminLogin || isAdminDashboard;
  const showNavAndFooter = !isAdminRoute;

  useEffect(() => {
    if (isAdminLogin && isAdminAuthenticated()) {
      navigate(ROUTES.adminDashboard);
    }
    if (isAdminDashboard && !isAdminAuthenticated()) {
      navigate(ROUTES.adminLogin);
    }
  }, [path, isAdminLogin, isAdminDashboard, navigate]);

  const handleLoginSuccess = () => {
    setAdminAuthenticated();
    setToaster({
      message: "Admin Session Verified",
      subMessage: "Secure credentials accepted. Full content editing clearance granted.",
    });
    navigate(ROUTES.adminDashboard);
  };

  const handleLogout = () => {
    clearAdminAuthenticated();
    navigate(ROUTES.home);
  };

  const renderPage = () => {
    if (path === ROUTES.home) {
      return <HomeView />;
    }
    if (path === ROUTES.about) {
      return <AboutView />;
    }
    if (path === ROUTES.products) {
      return (
        <ProductsView onRequestQuote={() => setIsQuoteModalOpen(true)} />
      );
    }
    if (path === ROUTES.brands) {
      return <BrandsView />;
    }
    if (path === ROUTES.recipes) {
      return <RecipesView />;
    }
    if (matchPath("/recipes/:id", path)) {
      return <RecipeDetailView />;
    }
    if (path === ROUTES.export) {
      return (
        <ExportView onRequestQuote={() => setIsQuoteModalOpen(true)} />
      );
    }
    if (matchPath("/products/:slug", path)) {
      return <ProductDetailView />;
    }
    if (isAdminLogin) {
      if (isAdminAuthenticated()) {
        return null;
      }
      return (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onBack={() => navigate(ROUTES.home)}
        />
      );
    }
    if (isAdminDashboard) {
      if (!isAdminAuthenticated()) {
        return null;
      }
      return <Dashboard onLogout={handleLogout} />;
    }
    return <HomeView />;
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans selection:bg-primary-fixed-dim selection:text-primary overflow-x-hidden">
      {showNavAndFooter && (
        <Header
          onRequestQuote={() => setIsQuoteModalOpen(true)}
        />
      )}

      <main className={`flex-grow animate-fadeIn ${showNavAndFooter ? "pt-[72px]" : ""}`}>
        {renderPage()}
      </main>

      {showNavAndFooter && <Footer />}

      <QuotationModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      {toaster && (
        <Toaster
          message={toaster.message}
          subMessage={toaster.subMessage}
          duration={5000}
          onClose={() => setToaster(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AdminDataProvider>
        <AppContent />
      </AdminDataProvider>
    </Router>
  );
}
