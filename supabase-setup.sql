-- =========================================================
-- ChukkVS Database Setup
-- Paste this entire file into Supabase > SQL Editor > New Query
-- Then click RUN. You only need to do this once.
-- =========================================================

-- 1. Create the posts table
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  category text,
  case_number int,
  published boolean not null default false,
  author_id uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Auto-update `updated_at` when a post changes
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists on_posts_updated on public.posts;
create trigger on_posts_updated
  before update on public.posts
  for each row execute function public.handle_updated_at();

-- 3. Enable Row Level Security (RLS) — keeps your data safe
alter table public.posts enable row level security;

-- 4. Policies

-- Anyone can READ published posts (for the public site)
drop policy if exists "Anyone can view published posts" on public.posts;
create policy "Anyone can view published posts"
  on public.posts for select
  using (published = true);

-- Logged-in users can read ALL posts (including drafts)
drop policy if exists "Authors can view their own posts" on public.posts;
create policy "Authors can view their own posts"
  on public.posts for select
  using (auth.uid() is not null);

-- Logged-in users can insert posts
drop policy if exists "Authenticated users can create posts" on public.posts;
create policy "Authenticated users can create posts"
  on public.posts for insert
  with check (auth.uid() is not null);

-- Logged-in users can update posts
drop policy if exists "Authenticated users can update posts" on public.posts;
create policy "Authenticated users can update posts"
  on public.posts for update
  using (auth.uid() is not null);

-- Logged-in users can delete posts
drop policy if exists "Authenticated users can delete posts" on public.posts;
create policy "Authenticated users can delete posts"
  on public.posts for delete
  using (auth.uid() is not null);

-- 5. Helpful indexes for speed
create index if not exists posts_published_idx on public.posts (published, published_at desc);
create index if not exists posts_slug_idx on public.posts (slug);
