import { ArrowRight, ChefHat } from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { RichTextContent } from "./Admin/RichTextEditor";
import { resolveMediaUrl } from "../lib/mediaUrl";
import { ROUTES, useParams, useRouter } from "../lib/router";

export default function RecipeDetailView() {
  const { id } = useParams("/recipes/:id");
  const { navigate } = useRouter();
  const { recipesPage } = useAdminData();

  const recipe = recipesPage.recipes.find((r) => r.id === id);
  const relatedRecipes = recipesPage.recipes.filter((r) => r.id !== id).slice(0, 3);

  if (!recipe) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-on-surface-variant pt-24">
        <p>Recipe not found.</p>
        <button
          onClick={() => navigate(ROUTES.recipes)}
          className="text-primary hover:text-secondary font-sans text-xs font-bold uppercase tracking-wider"
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="relative overflow-hidden pt-12 pb-16 bg-white">
        <div className="absolute inset-0 grain-texture -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <button
            onClick={() => navigate(ROUTES.recipes)}
            className="text-primary hover:text-secondary font-sans text-xs font-bold uppercase tracking-wider mb-8 inline-flex items-center gap-2"
          >
            ← Back to Recipes
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-outline-variant/20 shadow-2xl bg-surface">
              {recipe.image ? (
                <img
                  src={resolveMediaUrl(recipe.image)}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <ChefHat className="w-16 h-16 opacity-30" />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <span className="inline-block bg-primary-fixed text-on-primary-fixed-variant px-4 py-1.5 rounded-sm font-sans text-xs font-bold uppercase tracking-[0.2em]">
                Recipe
              </span>
              <h1 className="font-serif-title text-4xl sm:text-5xl text-primary font-medium leading-tight">
                {recipe.name}
              </h1>
              {recipe.description && (
                <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed">
                  {recipe.description}
                </p>
              )}
            </div>
          </div>

          {recipe.fullRecipe && (
            <div className="mt-14 p-8 sm:p-10 bg-surface-container-low border border-outline-variant/20 rounded-2xl shadow-sm">
              <h2 className="font-serif-title text-2xl sm:text-3xl text-primary font-medium mb-6">
                How to Prepare
              </h2>
              <RichTextContent
                html={recipe.fullRecipe}
                className="text-base text-on-surface-variant leading-relaxed"
              />
            </div>
          )}
        </div>
      </section>

      {relatedRecipes.length > 0 && (
        <section className="py-24 bg-white border-t border-outline-variant/15">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium">More Recipes</h2>
                <div className="h-1 w-20 bg-secondary mt-4 rounded-full" />
              </div>
              <button
                onClick={() => navigate(ROUTES.recipes)}
                className="text-primary hover:text-secondary font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 group transition-colors"
              >
                View All Recipes
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedRecipes.map((r) => (
                <article
                  key={r.id}
                  onClick={() => navigate(ROUTES.recipeDetail(r.id))}
                  className="group cursor-pointer bg-white border border-outline-variant/20 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-surface-container-low">
                    {r.image ? (
                      <img
                        src={resolveMediaUrl(r.image)}
                        alt={r.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <ChefHat className="w-10 h-10 opacity-30" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-serif-title text-xl text-primary font-semibold group-hover:text-secondary transition-colors">
                      {r.name}
                    </h3>
                    <p className="font-sans text-sm text-on-surface-variant line-clamp-2">{r.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
