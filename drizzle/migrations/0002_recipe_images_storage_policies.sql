create policy "Public read recipe images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'recipe-images');

create policy "Public upload recipe images"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'recipe-images');

create policy "Public update recipe images"
on storage.objects for update
to anon, authenticated
using (bucket_id = 'recipe-images')
with check (bucket_id = 'recipe-images');

create policy "Public delete recipe images"
on storage.objects for delete
to anon, authenticated
using (bucket_id = 'recipe-images');