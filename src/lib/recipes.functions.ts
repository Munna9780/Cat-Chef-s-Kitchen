import { createClient } from "@supabase/supabase-js";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export type Recipe = Database["public"]["Tables"]["recipes"]["Row"];

function getPublicClient() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"];
  if (!url || !key) throw new Error("The recipe library is temporarily unavailable.");

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
  });
}

const recipeColumns =
  "id,title,cuisine,time_minutes,difficulty,servings,icon,accent,tags,ingredients,steps,image_url,created_at" as const;

export const getRecipes = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await getPublicClient()
    .from("recipes")
    .select(recipeColumns)
    .order("title");
  if (error) throw new Error("We couldn't load the recipe shelf.");
  return data;
});

export const getRecipe = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { data: recipe, error } = await getPublicClient()
      .from("recipes")
      .select(recipeColumns)
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error("We couldn't load this recipe.");
    return recipe;
  });
