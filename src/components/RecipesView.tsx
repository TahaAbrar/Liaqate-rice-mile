import { ChefHat, ArrowRight } from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { resolveMediaUrl } from "../lib/mediaUrl";
import { ROUTES, useRouter } from "../lib/router";
import PageBanner from "./PageBanner";

export default function RecipesView() {
  const { navigate } = useRouter();
  const { recipesPage } = useAdminData();

  return (
    <div className="w-full">
      <PageBanner
        image={recipesPage.bannerImage}
        badge={recipesPage.badge}
        title={recipesPage.title}
        subtitle={recipesPage.subtitle}
      />

      <section className="py-16 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {recipesPage.recipes.length === 0 ? (
            <p className="text-center text-on-surface-variant py-16">Recipes coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipesPage.recipes.map((recipe) => (
                <article
                  key={recipe.id}
                  onClick={() => navigate(ROUTES.recipeDetail(recipe.id))}
                  className="group cursor-pointer bg-white border border-outline-variant/20 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-surface-container-low relative">
                    {recipe.image ? (
                      <img
                        src={resolveMediaUrl(recipe.image)}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <ChefHat className="w-12 h-12 opacity-30" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 font-sans text-[10px] font-bold tracking-widest rounded-full uppercase shadow-md">
                        Recipe
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif-title text-2xl text-primary font-semibold group-hover:text-secondary transition-colors leading-tight">
                        {recipe.name}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                    {recipe.description && (
                      <p className="font-sans text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                        {recipe.description}
                      </p>
                    )}
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
