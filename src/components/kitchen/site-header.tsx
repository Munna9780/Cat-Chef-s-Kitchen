import { Link, useNavigate } from "@tanstack/react-router";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import type { Recipe } from "@/lib/recipes.functions";

export function SiteHeader({ recipes }: { recipes: Recipe[] }) {
  const navigate = useNavigate();
  const surprise = () => {
    if (!recipes.length) return;
    const recipe = recipes[Math.floor(Math.random() * recipes.length)];
    if (recipe) navigate({ to: "/recipe/$recipeId", params: { recipeId: recipe.id } });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" search={{ q: "", cuisine: "All" }} className="flex min-w-0 items-baseline gap-2" aria-label="Cat Chef's Kitchen home">
          <span className="font-display text-lg font-bold text-foreground sm:text-xl">Cat Chef's Kitchen</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">recipes from everywhere</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-3" aria-label="Main navigation">
          <Link to="/" search={{ q: "", cuisine: "All" }} className="hidden px-2 py-2 text-sm font-medium text-foreground hover:text-primary sm:block">Home</Link>
          <Link to="/" search={{ q: "", cuisine: "All" }} hash="recipes" className="hidden px-2 py-2 text-sm font-medium text-foreground hover:text-primary sm:block">Recipes</Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">About</Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl rounded-kitchen border-2 border-foreground bg-background p-8 shadow-hard">
              <DialogHeader>
                <DialogTitle className="font-display text-3xl">About the kitchen</DialogTitle>
                <DialogDescription className="pt-3 text-base leading-7 text-foreground">
                  Cat Chef's Kitchen is a shelf of real, complete recipes from cuisines around the world — search for a dish or an ingredient, browse by region, or hit Surprise me when you can't decide. Every recipe here comes with a full ingredients list and step-by-step method, no long story to scroll past.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button variant="kitchen" size="sm" onClick={surprise} disabled={!recipes.length}>
            <Shuffle aria-hidden="true" /> <span className="hidden min-[390px]:inline">Surprise me</span><span className="sr-only min-[390px]:hidden">Surprise me</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
