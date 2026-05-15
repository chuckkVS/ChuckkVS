import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';

export const revalidate = 0;

type Post = {
  id: string;
  case_number: number;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  published_at: string | null;
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const supabase = createClient();
  let query = supabase
    .from('posts')
    .select('id, case_number, slug, title, excerpt, category, published_at')
    .eq('published', true)
    .order('case_number', { ascending: false });

  if (searchParams.category) {
    query = query.eq('category', searchParams.category);
  }

  const { data: posts } = await query;

  if (!posts || posts.length === 0) {
    return (
      <main>
        <section className="empty-state">
          <div className="empty-mark">◆ &nbsp; First Edition &nbsp; ◆</div>
          <h1 className="empty-title">
            The Press <span className="vs-i">Is</span> Ready.
            <br />The Files Are Empty.
          </h1>
          <p className="empty-subtitle">
            No cases filed yet. No stories buried. The first investigation is being written — when it drops, it drops here first.
          </p>
          <div className="empty-meta">
            <span className="case-badge">Case #001</span>
            <span className="sep">◆</span>
            <span>Status: In Progress</span>
            <span className="sep">◆</span>
            <span>Filed: Soon</span>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <div style={{ padding: '40px 0 0' }}>
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '0.6rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--gold)',
          }}
        >
          ◆ {searchParams.category ? `Category: ${searchParams.category}` : 'All Case Files'}
        </div>
      </div>

      <div className="list-head">
        <span>File No.</span>
        <span>Investigation</span>
        <span>Category</span>
        <span>Date Filed</span>
        <span>Status</span>
      </div>

      {posts.map((post: Post) => (
        <Link key={post.id} href={`/post/${post.slug}`} className="list-row">
          <div className="list-case">
            #{String(post.case_number).padStart(3, '0')}
          </div>
          <div>
            <div className="list-title" dangerouslySetInnerHTML={{ __html: renderTitle(post.title) }} />
            {post.excerpt && <div className="list-blurb">{post.excerpt}</div>}
          </div>
          <div>
            {post.category && <div className="list-tag">{post.category}</div>}
          </div>
          <div className="list-date">
            {post.published_at ? formatDate(post.published_at) : '—'}
          </div>
          <div className="list-open">Open →</div>
        </Link>
      ))}
    </main>
  );
}

function renderTitle(title: string) {
  // Auto-stylize "VS" inside titles so "ChukkVS X" looks right
  const escaped = title
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped.replace(/\bVS\b/g, '<span class="vs-i">VS</span>');
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
