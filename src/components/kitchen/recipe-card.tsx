import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock3, Gauge, Users } from "lucide-react";
import { accentClasses } from "@/lib/recipes";
import type { Recipe } from "@/lib/recipes.functions";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const accent = accentClasses[recipe.accent] ?? "bg-turmeric";
  return (
    <Link
      to="/recipe/$recipeId"
      params={{ recipeId: recipe.id }}
      className="group flex min-h-72 flex-col overflow-hidden rounded-kitchen border-2 border-foreground bg-card transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
    >
      <div className={`relative aspect-[16/10] overflow-hidden border-b-2 border-foreground ${accent}`}>
        {recipe.image_url ? (
          <img src={recipe.image_url} alt={recipe.title} loading="lazy" className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="size-full" aria-hidden="true" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase text-muted-foreground">{recipe.cuisine}</p>
          <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </div>
        <h2 className="font-display text-3xl font-semibold leading-tight text-foreground">{recipe.title}</h2>
        <div className="mt-auto grid grid-cols-3 gap-2 border-t border-line pt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock3 className="size-3.5" />{recipe.time_minutes} min</span>
          <span className="flex items-center justify-center gap-1.5"><Gauge className="size-3.5" />{recipe.difficulty}</span>
          <span className="flex items-center justify-end gap-1.5"><Users className="size-3.5" />Serves {recipe.servings}</span>
        </div>
      </div>
    </Link>
  );
}
