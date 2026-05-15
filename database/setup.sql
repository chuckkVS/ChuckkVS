-- ==============================================================
-- ChukkVS database setup
-- Paste this entire file into the Supabase SQL Editor and click "Run"
-- ==============================================================

-- 1. POSTS table
create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  case_number  integer not null unique,
  slug         text not null unique,
  title        text not null,
  excerpt      text,
  category     text,
  body         text,
  published    boolean not null default false,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Auto-update updated_at on every change
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- 2. ROW LEVEL SECURITY — this is what makes "only you can post" work
alter table public.posts enable row level security;

-- Anyone (logged in or not) can READ published posts
drop policy if exists "Anyone can read published posts" on public.posts;
create policy "Anyone can read published posts"
  on public.posts for select
  using (published = true);

-- Logged-in users can READ their own drafts + published posts
drop policy if exists "Authed users can read all posts" on public.posts;
create policy "Authed users can read all posts"
  on public.posts for select
  to authenticated
  using (true);

-- Only logged-in users can INSERT
drop policy if exists "Authed users can insert posts" on public.posts;
create policy "Authed users can insert posts"
  on public.posts for insert
  to authenticated
  with check (true);

-- Only logged-in users can UPDATE
drop policy if exists "Authed users can update posts" on public.posts;
create policy "Authed users can update posts"
  on public.posts for update
  to authenticated
  using (true)
  with check (true);

-- Only logged-in users can DELETE
drop policy if exists "Authed users can delete posts" on public.posts;
create policy "Authed users can delete posts"
  on public.posts for delete
  to authenticated
  using (true);

-- Helpful indexes
create index if not exists posts_published_idx on public.posts (published, case_number desc);
create index if not exists posts_slug_idx on public.posts (slug);
create index if not exists posts_category_idx on public.posts (category);

-- ==============================================================
-- DONE. Next: create your editor account in Supabase → Authentication
-- ==============================================================
