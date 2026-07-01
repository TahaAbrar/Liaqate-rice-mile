import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ProductsView from "./components/ProductsView";
import ExportView from "./components/ExportView";
import ProductDetailView from "./components/ProductDetailView";
import QuotationModal from "./components/QuotationModal";
import LoginPage from "./components/Admin/LoginPage";
import Dashboard from "./components/Admin/Dashboard";
import Toaster from "./components/Admin/Toaster";
import { AdminDataProvider, useAdminData } from "./context/AdminDataContext";

type Screen = "home" | "about" | "products" | "export" | "product-detail" | "admin-login" | "admin-dashboard";

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [selectedProductId, setSelectedProductId] = useState<string>("super-basmati");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  
  // Toaster notifications state
  const [toaster, setToaster] = useState<{ message: string; subMessage?: string } | null>(null);

  // Scroll to top on screen transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentScreen]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentScreen("product-detail");
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLoginSuccess = () => {
    // Trigger the beautiful amber focus-gain toaster with physics animations
    setToaster({
      message: "Admin Session Verified",
      subMessage: "Secure credentials accepted. Full content editing clearance granted.",
    });
    setCurrentScreen("admin-dashboard");
  };

  const handleLogout = () => {
    setCurrentScreen("home");
  };

  // Hide header and footer if in the dedicated admin dashboard to maximize workspace focus
  const showNavAndFooter = currentScreen !== "admin-dashboard";

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans selection:bg-primary-fixed-dim selection:text-primary overflow-x-hidden">
      {/* Sticky header */}
      {showNavAndFooter && (
        <Header
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onRequestQuote={() => setIsQuoteModalOpen(true)}
        />
      )}

      {/* Main viewport */}
      <main className="flex-grow animate-fadeIn">
        {currentScreen === "home" && (
          <HomeView 
            onSelectProduct={handleSelectProduct} 
            onNavigate={handleNavigate} 
          />
        )}
        
        {currentScreen === "about" && (
          <AboutView 
            onNavigate={handleNavigate} 
          />
        )}
        
        {currentScreen === "products" && (
          <ProductsView 
            onSelectProduct={handleSelectProduct} 
            onRequestQuote={() => setIsQuoteModalOpen(true)} 
          />
        )}
        
        {currentScreen === "export" && (
          <ExportView 
            onNavigate={handleNavigate} 
            onRequestQuote={() => setIsQuoteModalOpen(true)} 
          />
        )}
        
        {currentScreen === "product-detail" && (
          <ProductDetailView
            productId={selectedProductId}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === "admin-login" && (
          <LoginPage 
            onLoginSuccess={handleLoginSuccess}
            onBack={() => setCurrentScreen("home")}
          />
        )}

        {currentScreen === "admin-dashboard" && (
          <Dashboard 
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Footer */}
      {showNavAndFooter && (
        <Footer onNavigate={handleNavigate} />
      )}

      {/* Global quotation request modal */}
      <QuotationModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />

      {/* High-Class Dynamic Toaster Notification (lasts exactly 5 seconds) */}
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
    <AdminDataProvider>
      <AppContent />
    </AdminDataProvider>
  );
}
