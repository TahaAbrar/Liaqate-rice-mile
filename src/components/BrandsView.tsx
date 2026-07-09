import { Award } from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { resolveMediaUrl } from "../lib/mediaUrl";
import PageBanner from "./PageBanner";

export default function BrandsView() {
  const { brandsPage } = useAdminData();

  return (
    <div className="w-full">
      <PageBanner
        image={brandsPage.bannerImage}
        badge={brandsPage.badge}
        title={brandsPage.title}
        subtitle={brandsPage.subtitle}
      />

      {/* Brand Story */}
      <section className="py-20 bg-surface-container-low border-y border-outline-variant/15">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary-fixed/15 rounded-full blur-3xl" />
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-outline-variant/20 shadow-xl bg-white">
              {brandsPage.storyImage ? (
                <img
                  src={resolveMediaUrl(brandsPage.storyImage)}
                  alt={brandsPage.storyHeading}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-on-surface-variant text-sm">
                  Brand story image
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest">Brand Heritage</span>
            <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium leading-tight">
              {brandsPage.storyHeading}
            </h2>
            <p className="font-sans text-base text-on-surface-variant leading-relaxed whitespace-pre-line">
              {brandsPage.storyDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium">Our Brand Portfolio</h2>
            <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto">
              Each brand represents our dedication to quality milling, authentic aroma, and trusted export standards.
            </p>
          </div>

          {brandsPage.brands.length === 0 ? (
            <p className="text-center text-on-surface-variant py-16">Brands coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brandsPage.brands.map((brand) => (
                <article
                  key={brand.id}
                  className="group bg-white border border-outline-variant/20 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-surface-container-low">
                    {brand.image ? (
                      <img
                        src={resolveMediaUrl(brand.image)}
                        alt={brand.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Award className="w-12 h-12 opacity-30" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif-title text-2xl text-primary font-semibold group-hover:text-secondary transition-colors">
                      {brand.name}
                    </h3>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed line-clamp-6">
                      {brand.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
