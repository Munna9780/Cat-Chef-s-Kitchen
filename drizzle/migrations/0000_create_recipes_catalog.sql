CREATE TABLE public.recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  cuisine text NOT NULL,
  time_minutes integer NOT NULL CHECK (time_minutes > 0),
  difficulty text NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Advanced')),
  servings integer NOT NULL CHECK (servings > 0),
  icon text NOT NULL,
  accent text NOT NULL CHECK (accent IN ('#E2A73B', '#C1442B', '#1F5C55', '#4B6B43', '#6B3F52', '#35507A')),
  tags text[] NOT NULL DEFAULT '{}',
  ingredients text[] NOT NULL DEFAULT '{}',
  steps text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.recipes TO anon;
GRANT SELECT ON public.recipes TO authenticated;
GRANT ALL ON public.recipes TO service_role;

ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recipes are publicly readable"
ON public.recipes
FOR SELECT
TO anon, authenticated
USING (true);

CREATE INDEX recipes_cuisine_idx ON public.recipes (cuisine);
CREATE INDEX recipes_title_idx ON public.recipes (title);