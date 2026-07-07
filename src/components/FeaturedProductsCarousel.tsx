import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CatalogProduct } from "../types/catalog";
import { ROUTES, useRouter } from "../lib/router";

interface FeaturedProductsCarouselProps {
  products: CatalogProduct[];
}

export default function FeaturedProductsCarousel({ products }: FeaturedProductsCarouselProps) {
  const { navigate } = useRouter();
  const [slide, setSlide] = useState(0);
  const needsCarousel = products.length > 3;

  const goNext = useCallback(() => {
    setSlide((s) => (s + 1) % products.length);
  }, [products.length]);

  const goPrev = useCallback(() => {
    setSlide((s) => (s - 1 + products.length) % products.length);
  }, [products.length]);

  useEffect(() => {
    if (!needsCarousel) return;
    const timer = window.setInterval(goNext, 5000);
    return () => window.clearInterval(timer);
  }, [needsCarousel, goNext]);

  const visible: CatalogProduct[] = needsCarousel
    ? Array.from({ length: 3 }, (_, i) => products[(slide + i) % products.length])
    : products;

  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium">
            Our Finest Selections
          </h2>
          <p className="font-sans text-base text-on-surface-variant max-w-xl mx-auto">
            Discover the aromatic essence and superior grain length of our signature exports.
          </p>
        </div>

        <div className="relative">
          {needsCarousel && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous products"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-outline-variant/30 shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next products"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-outline-variant/30 shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${
              needsCarousel ? "px-8 sm:px-12" : ""
            }`}
          >
            {visible.map((product) => (
              <div
                key={`${product.id}-${slide}`}
                className="bg-white rounded-xl overflow-hidden border border-outline-variant/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full animate-fadeIn"
              >
                <div className="h-64 w-full overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest shadow-sm">
                      {product.tagName}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow text-center">
                  <h3 className="font-serif-title text-2xl text-primary font-medium mb-2">{product.name}</h3>
                  <p className="text-on-surface-variant font-sans text-sm mb-6 leading-relaxed flex-grow">
                    {product.description}
                  </p>
                  <button
                    onClick={() => navigate(ROUTES.productDetail(product.id))}
                    className="w-full py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    Specifications
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
