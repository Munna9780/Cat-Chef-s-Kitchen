import { useMemo, type FormEvent } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, UtensilsCrossed, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "@/components/kitchen/recipe-card";
import { SiteHeader } from "@/components/kitchen/site-header";
import { recipesQueryOptions } from "@/lib/recipes";

const suggestions = ["Pad Thai", "Butter Chicken", "Tacos al Pastor", "Ratatouille", "Bibimbap"];

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? search["q"].slice(0, 120) : "",
    cuisine: typeof search["cuisine"] === "string" ? search["cuisine"].slice(0, 40) : "All",
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(recipesQueryOptions),
  head: () => ({
    meta: [
      { title: "Cat Chef's Kitchen — Recipes from everywhere" },
      { name: "description", content: "Search complete, cookable recipes by dish, cuisine, or ingredient." },
      { property: "og:title", content: "Cat Chef's Kitchen — Recipes from everywhere" },
      { property: "og:description", content: "Search complete, cookable recipes by dish, cuisine, or ingredient." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
  errorComponent: () => <LoadFailure />,
  notFoundComponent: () => <LoadFailure />,
});

function HomePage() {
  const { data: recipes } = useSuspenseQuery(recipesQueryOptions);
  const { q, cuisine } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });

  const filtered = useMemo(() => {
    const words = q.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    return recipes.filter((recipe) => {
      if (cuisine !== "All" && recipe.cuisine !== cuisine) return false;
      const haystack = [recipe.title, recipe.cuisine, ...recipe.tags, ...recipe.ingredients]
        .join(" ")
        .toLocaleLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [recipes, q, cuisine]);

  const updateSearch = (next: { q?: string; cuisine?: string }) =>
    navigate({
      search: (previous) => ({ ...previous, ...next }),
      hash: "recipes",
      replace: true,
    });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    updateSearch({ q: String(form.get("query") ?? "").trim() });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader recipes={recipes} />
      <main>
        <section className="border-b border-line px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 flex justify-center text-4xl" aria-hidden="true">🐈‍⬛</div>
            <h1 className="font-display text-5xl font-bold leading-none sm:text-7xl lg:text-8xl">What are you hungry for?</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Search by dish, cuisine, or whatever is waiting in your pantry.</p>
            <form onSubmit={handleSubmit} className="mx-auto mt-9 flex max-w-3xl flex-col gap-3 rounded-kitchen border-2 border-foreground bg-card p-2 shadow-hard sm:flex-row">
              <label className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="sr-only">Search recipes</span>
                <input name="query" defaultValue={q} key={q} className="h-12 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground" placeholder="Try chickpeas, spicy, or Thai…" />
              </label>
              <Button type="submit" variant="search">Find a recipe</Button>
            </form>
            <div className="mt-7 flex flex-wrap justify-center gap-2" aria-label="Quick searches">
              {suggestions.map((suggestion) => (
                <Button key={suggestion} variant="outline" size="sm" className="rounded-full border-line bg-transparent shadow-none hover:border-foreground" onClick={() => updateSearch({ q: suggestion })}>{suggestion}</Button>
              ))}
            </div>
          </div>
        </section>

        <section id="recipes" className="scroll-mt-20 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mt-8 flex items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground">The recipe shelf</p>
                <p className="mt-1 font-display text-2xl font-semibold">{filtered.length} {filtered.length === 1 ? "recipe" : "recipes"}</p>
              </div>
              {(q || cuisine !== "All") && <Button variant="ghost" size="sm" onClick={() => navigate({ search: { q: "", cuisine: "All" }, hash: "recipes" })}><X /> Clear filters</Button>}
            </div>
            {filtered.length ? (
              <div className="mt-6 grid gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
                {filtered.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
              </div>
            ) : (
              <div className="mx-4 mt-6 border-y border-dashed border-line py-20 text-center sm:mx-6 lg:mx-8">
                <UtensilsCrossed className="mx-auto size-8 text-muted-foreground" />
                <h2 className="mt-4 font-display text-3xl font-semibold">Nothing on this shelf yet</h2>
                <p className="mt-2 text-muted-foreground">Try a broader ingredient or clear the cuisine filter.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="border-t border-line px-4 py-8 text-center text-sm text-muted-foreground">Cat Chef's Kitchen — a growing shelf of recipes, built to keep adding more.</footer>
    </div>
  );
}

function LoadFailure() {
  return <main className="grid min-h-screen place-items-center bg-background px-4 text-center"><div><h1 className="font-display text-4xl">The kitchen is taking a breather.</h1><p className="mt-3 text-muted-foreground">Please refresh and try the recipe shelf again.</p></div></main>;
}
