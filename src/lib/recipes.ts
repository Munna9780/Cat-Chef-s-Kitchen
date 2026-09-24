import { queryOptions } from "@tanstack/react-query";
import { getRecipe, getRecipes } from "./recipes.functions";

export const cuisines = [
  "All", "Italian", "Indian", "Mexican", "Japanese", "Thai", "Chinese", "French",
  "Greek", "Middle Eastern", "Korean", "Vietnamese", "American", "Ethiopian", "Spanish", "Brazilian",
] as const;

export const recipesQueryOptions = queryOptions({
  queryKey: ["recipes"],
  queryFn: () => getRecipes(),
  staleTime: 5 * 60_000,
});

export const recipeQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["recipes", id],
    queryFn: () => getRecipe({ data: { id } }),
    staleTime: 5 * 60_000,
  });

export const accentClasses: Record<string, string> = {
  "#E2A73B": "bg-turmeric",
  "#C1442B": "bg-paprika",
  "#1F5C55": "bg-teal",
  "#4B6B43": "bg-cardamom",
  "#6B3F52": "bg-plum",
  "#35507A": "bg-indigo",
};
