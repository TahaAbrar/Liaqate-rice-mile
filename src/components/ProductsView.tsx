import { useState } from "react";
import { Product } from "../data";
import { Download, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { ROUTES, useRouter } from "../lib/router";

interface ProductsViewProps {
  onRequestQuote: () => void;
}

export default function ProductsView({ onRequestQuote }: ProductsViewProps) {
  const { navigate } = useRouter();
  const { productPageContent, products } = useAdminData();
  const [activeFilter, setActiveFilter] = useState<"All" | "Basmati" | "Non-Basmati" | "Premium Export" | "Sella">("All");

  const filterItems = [
    { id: "All", label: "All Varieties" },
    { id: "Basmati", label: "Basmati" },
    { id: "Non-Basmati", label: "Non-Basmati" },
    { id: "Premium Export", label: "Premium Export" },
    { id: "Sella", label: "Sella" },
  ] as const;

  const filteredProducts = products.filter((product) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Premium Export") {
      return product.badges.includes("Premium Export") || product.grade === "PREMIUM";
    }
    return product.category === activeFilter;
  });

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-6">
          <span className="font-sans font-bold text-xs text-primary uppercase tracking-[0.25em] bg-primary/5 px-4 py-1.5 rounded-full flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            {productPageContent.badge}
          </span>
          <h1 className="font-serif-title text-4xl sm:text-6xl text-primary max-w-4xl font-medium leading-none tracking-tight">
            {productPageContent.title}
          </h1>
          <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {productPageContent.desc}
          </p>
        </div>
      </section>

      {/* Sticky Filters bar */}
      <section className="sticky top-[73px] z-40 bg-background/90 backdrop-blur-md border-b border-outline-variant/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-3">
          {filterItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveFilter(item.id)}
              className={`px-6 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                activeFilter === item.id
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary hover:bg-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(ROUTES.productDetail(product.id))}
              className="group cursor-pointer flex flex-col bg-white border border-outline-variant/20 hover:border-primary/40 p-5 rounded-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image container */}
              <div className="aspect-[4/5] overflow-hidden relative rounded-lg bg-surface-container-low mb-6">
                <img
                  src={product.catalogImage}
                  alt={product.name}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3.5 py-1 font-sans text-[10px] font-bold tracking-widest rounded-full uppercase shadow-md">
                    {product.grade}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-serif-title text-2xl text-primary font-semibold group-hover:text-secondary transition-colors leading-tight">
                      {product.name}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-primary transform transition-transform group-hover:translate-x-1.5 flex-shrink-0 mt-1" />
                  </div>
                  
                  <p className="font-sans text-xs font-bold text-secondary tracking-wide mt-1.5 uppercase">
                    Age: {product.age} | Length: {product.length}
                  </p>
                  
                  <p className="font-sans text-sm text-on-surface-variant/90 leading-relaxed mt-3 line-clamp-3">
                    {product.description}
                  </p>
                </div>

                {/* Badges footer */}
                <div className="pt-5 border-t border-outline-variant/10 flex flex-wrap gap-2 mt-4">
                  {product.badges.map((badge) => (
                    <span
                      key={badge}
                      className="font-sans text-[10px] font-bold text-secondary bg-secondary-container/15 px-2.5 py-1 rounded"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          <div className="space-y-8">
            <h2 className="font-serif-title text-3xl sm:text-5xl font-medium leading-tight">
              {productPageContent.bespokeTitle}
            </h2>
            <p className="font-sans text-base text-primary-fixed-dim max-w-lg leading-relaxed">
              {productPageContent.bespokeDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => alert("Elite Grain Brochure download started! Check your downloads.")}
                className="bg-secondary-container text-on-secondary-container hover:bg-secondary-container/90 px-8 py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300"
              >
                {productPageContent.downloadBrochureLabel || "Download Brochure"}
                <Download className="w-4 h-4" />
              </button>
              <button 
                onClick={onRequestQuote}
                className="border border-white/40 text-white hover:bg-white/10 px-8 py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300"
              >
                {productPageContent.talkToExpertLabel || "Talk to an Expert"}
              </button>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="relative">
            <div className="absolute -inset-4 bg-secondary-fixed/5 blur-3xl rounded-full"></div>
            <div className="relative bg-primary-container p-8 rounded-2xl border border-outline/10 shadow-xl space-y-6">
              <h4 className="font-serif-title text-2xl font-medium text-white pb-3 border-b border-white/10">
                {productPageContent.inquiryDashboardTitle || "Inquiry Dashboard"}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-primary/30 rounded-xl border border-outline-variant/10">
                  <span className="block font-sans text-[11px] font-bold text-primary-fixed-dim uppercase tracking-wider">
                    {productPageContent.monthlyCapacityLabel || "Monthly Capacity"}
                  </span>
                  <span className="text-2xl sm:text-3xl font-semibold text-white block mt-2">
                    {productPageContent.monthlyCapacityValue || "15,000 MT"}
                  </span>
                </div>
                <div className="p-5 bg-primary/30 rounded-xl border border-outline-variant/10">
                  <span className="block font-sans text-[11px] font-bold text-primary-fixed-dim uppercase tracking-wider">
                    {productPageContent.exportMarketsLabel || "Export Markets"}
                  </span>
                  <span className="text-2xl sm:text-3xl font-semibold text-white block mt-2">
                    {productPageContent.exportMarketsValue || "45+ Countries"}
                  </span>
                </div>
              </div>
              <div className="p-5 bg-primary/30 rounded-xl border border-outline-variant/10 space-y-3">
                <span className="block font-sans text-[11px] font-bold text-primary-fixed-dim uppercase tracking-wider">
                  {productPageContent.certificationsLabel || "Quality Certifications"}
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(productPageContent.certifications || ["ISO 9001", "HACCP", "FDA APPROVED", "HALAL"]).map((cert) => (
                    <span
                      key={cert}
                      className="bg-white/15 px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-wider rounded-md text-white"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
