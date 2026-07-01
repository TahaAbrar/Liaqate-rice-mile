import { Wheat, Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  currentScreen: string;
  onNavigate: (screen: any) => void;
  onRequestQuote: () => void;
}

export default function Header({ currentScreen, onNavigate, onRequestQuote }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "products", label: "Product" },
    { id: "export", label: "Export" },
  ] as const;

  return (
    <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-outline-variant/10 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group"
          onClick={() => onNavigate("home")}
          id="brand-logo"
        >
          <Wheat className="text-primary w-8 h-8 transition-transform duration-500 group-hover:rotate-12" />
          <span className="font-serif-title text-2xl font-semibold text-primary uppercase tracking-widest">
            ELITE GRAIN
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`font-sans font-medium text-base transition-all duration-300 relative pb-1 ${
                currentScreen === item.id || (item.id === "products" && currentScreen === "product-detail")
                  ? "text-primary font-semibold border-b-2 border-primary"
                  : "text-on-surface-variant hover:text-primary hover:scale-105"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Request Quotation Button */}
        <div className="hidden md:block">
          <button
            onClick={onRequestQuote}
            className="bg-primary text-white hover:bg-primary-container px-6 py-2.5 rounded-full hover:scale-105 transition-all duration-300 font-sans text-xs font-semibold uppercase tracking-wider shadow-sm"
          >
            Request Quotation
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-primary p-1 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-outline-variant/20 px-6 py-4 flex flex-col gap-4 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left font-sans font-medium py-2 px-3 rounded-lg transition-colors text-base ${
                currentScreen === item.id || (item.id === "products" && currentScreen === "product-detail")
                  ? "bg-primary/5 text-primary font-semibold"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onRequestQuote();
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 bg-primary text-white py-3 rounded-full font-semibold uppercase text-xs tracking-wider text-center block"
          >
            Request Quotation
          </button>
        </div>
      )}
    </header>
  );
}
