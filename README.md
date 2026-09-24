# Cat Chef's Kitchen

Build a recipe discovery website called "Cat Chef's Kitchen" with the tagline "recipes from everywhere".

DESIGN SYSTEM
- Colors: ink #1E1A14 (near-black warm), paper #FAF5EA (warm cream background), paper-dim #F0E7D6, line #DED2B8, and six accent colors used to color-code recipe cards: turmeric #E2A73B, paprika #C1442B, teal #1F5C55, cardamom #4B6B43, plum #6B3F52, indigo #35507A.
- Typography: 'Fraunces' (serif, editorial, cookbook feel) for headlines and titles; 'Work Sans' (sans-serif) for body text and UI. Load both from Google Fonts.
- Overall aesthetic: warm, editorial food-magazine feel, not a generic SaaS card-grid look. Rounded corners (14-16px), a hard offset shadow on the search bar (5px 5px 0 solid, no blur), dashed dividers in ingredient lists.

LAYOUT
1. Sticky top bar: wordmark "Cat Chef's Kitchen" (serif, bold) with small tagline next to it, and on the right: nav links "Home", "Recipes", "About", plus a dark pill button "Surprise me" that opens a random recipe.
2. Hero section: large serif headline "What are you hungry for?", a subheading inviting the user to search by dish, cuisine, or ingredient, and a prominent search bar (white card, black border, offset shadow) with an input and a "Find a recipe" button. Below it, a row of quick-suggestion chips (e.g. "Pad Thai", "Butter Chicken", "Tacos al Pastor", "Ratatouille", "Bibimbap").
3. A horizontally scrollable strip of cuisine filter tags (All, Italian, Indian, Mexican, Japanese, Thai, Chinese, French, Greek, Middle Eastern, Korean, Vietnamese, American, Ethiopian, Spanish, Brazilian), with the active one highlighted dark.
4. A results count line, then a responsive grid of recipe cards. Each card has a colored top band (using one of the six accent colors, cycled), a large emoji/icon in the corner, the cuisine name in small caps, the recipe title in serif, and a meta row with time, difficulty, and servings.
5. Clicking a card opens a detail view (modal or dedicated page) showing: cuisine label, title, time/difficulty/servings, diet tags, a two-column layout with a full ingredients list (dashed dividers, dash bullet) on the left and a numbered step-by-step method on the right (numbered circles in turmeric color).
6. "Home" scrolls back to the hero. "Recipes" jumps to the browsing grid. "About" opens a short panel: "Cat Chef's Kitchen is a shelf of real, complete recipes from cuisines around the world — search for a dish or an ingredient, browse by region, or hit Surprise me when you can't decide. Every recipe here comes with a full ingredients list and step-by-step method, no long story to scroll past."
7. Footer: "Cat Chef's Kitchen — a growing shelf of recipes, built to keep adding more."

FUNCTIONALITY
- Search filters recipes by matching the query against title, cuisine, tags, and ingredients (all words in the query must match somewhere).
- Cuisine strip filters the grid to that cuisine; "All" clears the filter.
- "Surprise me" opens a random recipe's detail view directly.
- Recipe tags include diet info like vegetarian, vegan, meat, seafood.

DATA / BACKEND
- Set up a Supabase-backed "recipes" table with columns: title (text), cuisine (text), time_minutes (int), difficulty (text), servings (int), icon (text, an emoji), accent (text, hex color), tags (text array), ingredients (text array), steps (text array).
- Enable row level security with a public read-only policy (anyone can SELECT, no public writes) so recipes can be managed later from the Supabase table editor.
- Seed the table with around 15-20 real, complete recipes spanning different world cuisines (Italian, Indian, Mexican, Japanese, Thai, Middle Eastern, Korean, etc.), each with genuine ingredients and real step-by-step instructions, not placeholder text.

Keep the whole experience fast, clean, and text-first — no long blog-style stories above the recipes, just direct search-and-cook functionality.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/828184cd-afdb-4ef1-a637-fffe735a9c03).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
