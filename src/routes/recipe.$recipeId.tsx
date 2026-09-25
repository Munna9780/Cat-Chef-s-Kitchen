import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock3, Gauge, Users } from "lucide-react";
import { SiteHeader } from "@/components/kitchen/site-header";
import { accentClasses, recipeQueryOptions, recipesQueryOptions } from "@/lib/recipes";

export const Route = createFileRoute("/recipe/$recipeId")({
  loader: async ({ context, params }) => {
    const [recipe] = await Promise.all([
      context.queryClient.ensureQueryData(recipeQueryOptions(params.recipeId)),
      context.queryClient.ensureQueryData(recipesQueryOptions),
    ]);
    if (!recipe) throw notFound();
    return recipe;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} — Cat Chef's Kitchen` : "Recipe unavailable — Cat Chef's Kitchen";
    const description = loaderData ? `Cook ${loaderData.title}, a complete ${loaderData.cuisine} recipe with ingredients and step-by-step instructions.` : "This recipe could not be found.";
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
      ...(loaderData?.image_url ? [
        { property: "og:image", content: loaderData.image_url },
        { name: "twitter:image", content: loaderData.image_url },
      ] : []),
    ] };
  },
  component: RecipePage,
  errorComponent: () => <RecipeUnavailable />,
  notFoundComponent: () => <RecipeUnavailable />,
});

function RecipePage() {
  const { recipeId } = Route.useParams();
  const { data: recipe } = useSuspenseQuery(recipeQueryOptions(recipeId));
  const { data: recipes } = useSuspenseQuery(recipesQueryOptions);
  if (!recipe) return <RecipeUnavailable />;
  const accent = accentClasses[recipe.accent] ?? "bg-turmeric";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader recipes={recipes} />
      <main>
        <section className={`${accent} border-b-2 border-foreground px-4 py-12 sm:px-6 sm:py-16 lg:px-8`}>
          <div className="mx-auto max-w-6xl">
            <Link to="/" search={{ q: "", cuisine: "All" }} hash="recipes" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"><ArrowLeft className="size-4" />Back to the shelf</Link>
            <div className="mt-10 grid items-end gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm font-bold uppercase">{recipe.cuisine}</p>
                <h1 className="mt-2 max-w-4xl font-display text-5xl font-bold leading-none sm:text-7xl">{recipe.title}</h1>
                <div className="mt-6 flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => <span key={tag} className="rounded-full border border-foreground bg-background/80 px-3 py-1 text-xs font-semibold capitalize">{tag}</span>)}
                </div>
              </div>
              {recipe.image_url ? (
                <img src={recipe.image_url} alt={recipe.title} className="aspect-[4/3] w-full max-w-sm rounded-kitchen border-2 border-foreground object-cover md:w-80" />
              ) : null}
            </div>
          </div>
        </section>
        <section className="border-b border-line px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-x-8 gap-y-3 text-sm font-semibold">
            <span className="flex items-center gap-2"><Clock3 className="size-4" />{recipe.time_minutes} minutes</span>
            <span className="flex items-center gap-2"><Gauge className="size-4" />{recipe.difficulty}</span>
            <span className="flex items-center gap-2"><Users className="size-4" />Serves {recipe.servings}</span>
          </div>
        </section>
        <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-20">
            <div>
              <h2 className="font-display text-4xl font-semibold">Ingredients</h2>
              <ul className="mt-6 border-t border-dashed border-line">
                {recipe.ingredients.map((ingredient) => <li key={ingredient} className="flex gap-3 border-b border-dashed border-line py-3.5 text-sm leading-6"><span aria-hidden="true">—</span><span>{ingredient}</span></li>)}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-4xl font-semibold">Method</h2>
              <ol className="mt-6 space-y-7">
                {recipe.steps.map((step, index) => <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-4"><span className="grid size-10 place-items-center rounded-full border-2 border-foreground font-display text-lg font-bold">{index + 1}</span><p className="pt-1.5 leading-7">{step}</p></li>)}
              </ol>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-line px-4 py-8 text-center text-sm text-muted-foreground">Cat Chef's Kitchen — a growing shelf of recipes, built to keep adding more.</footer>
    </div>
  );
}

function RecipeUnavailable() {
  return <main className="grid min-h-screen place-items-center bg-background px-4 text-center"><div><p className="text-5xl" aria-hidden="true">🙀</p><h1 className="mt-4 font-display text-4xl">That recipe left the kitchen.</h1><Link to="/" search={{ q: "", cuisine: "All" }} className="mt-5 inline-flex font-semibold underline">Browse all recipes</Link></div></main>;
}
