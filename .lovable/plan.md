# Cat Chef's Kitchen

## What I’ll build
- A warm editorial recipe discovery homepage with the requested sticky navigation, search-led introduction, quick suggestions, cuisine strip, recipe count, responsive recipe cards, About panel, and footer.
- A dedicated recipe detail page for every card and “Surprise me” result, with cooking metadata, diet labels, a dashed ingredient list, and numbered method steps.
- Fast filtering where every search word must match the recipe title, cuisine, tags, or ingredients, plus a cuisine filter that combines with search.

## Data and content
- Enable the built-in Lovable Cloud database and create a public read-only `recipes` collection with the requested fields plus a generated ID for stable recipe links.
- Add explicit read permissions and row-level protection so visitors can browse recipes but cannot add, edit, or delete them.
- Seed 18 complete recipes across the requested cuisines, with genuine ingredient quantities and actionable cooking instructions.

## Visual direction
- Use the exact warm ink, cream, line, and six cuisine-card accent colors supplied.
- Load Fraunces for editorial headings and Work Sans for navigation, controls, and body text.
- Keep the interface text-first, with restrained 14–16px corners, hard offset shadows, bold color bands, and no food-blog filler.

## Technical details
- Home browsing state will live in the URL so searches and cuisine selections are shareable and browser navigation works naturally.
- Initial recipe data will be rendered from the database through a public server read and cached with the existing query setup.
- Recipe details will use stable database IDs on a separate route; missing recipes and data errors will have clear recovery states.
- Navigation will link Home and Recipes to their relevant homepage positions; About opens an accessible dialog panel.
- I’ll verify desktop and mobile layouts, filtering, random selection, detail navigation, and current build diagnostics.
