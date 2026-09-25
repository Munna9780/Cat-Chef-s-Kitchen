import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type Recipe = Database["public"]["Tables"]["recipes"]["Row"];

const recipeColumns =
  "id,title,cuisine,time_minutes,difficulty,servings,icon,accent,tags,ingredients,steps,image_url,created_at" as const;

/**
 * Public read-only client. Works in the browser (Vite-inlined VITE_* values)
 * and during SSR (process.env), so static hosts like Netlify never depend on
 * a server runtime being wired up for the recipe catalog.
 */
function getPublicClient() {
  const env = (typeof process !== "undefined" ? process.env : {}) as Record<string, string | undefined>;

  const url = import.meta.env["VITE_SUPABASE_URL"] || env["SUPABASE_URL"];
  const key =
    import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ||
    env["SUPABASE_PUBLISHABLE_KEY"] ||
    env["SUPABASE_ANON_KEY"];

  if (!url || !key) throw new Error("The recipe library is temporarily unavailable.");

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
  });
}

export async function getRecipes(): Promise<Recipe[]> {
  const { data, error } = await getPublicClient()
    .from("recipes")
    .select(recipeColumns)
    .order("title");
  if (error) throw new Error("We couldn't load the recipe shelf.");
  return data ?? [];
}

export async function getRecipe(id: string): Promise<Recipe | null> {
  const { data, error } = await getPublicClient()
    .from("recipes")
    .select(recipeColumns)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("We couldn't load this recipe.");
  return data;
}
