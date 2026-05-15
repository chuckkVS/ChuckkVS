import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';

export const revalidate = 0;

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: posts } = await supabase
    .from('posts')
    .select('id, case_number, slug, title, category, published, published_at, updated_at')
    .order('case_number', { ascending: false });

  return (
    <main>
      <div style={{ padding: '40px 0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>
            ◆ Editor Dashboard
          </div>
          <h1 style={{ fontFamily: 'Impact, sans-serif', fontSize: '2.6rem', textTransform: 'uppercase', letterSpacing: '-1px' }}>
            All <span style={{ color: 'var(--red-bright)', fontStyle: 'italic' }}>Cases</span>
          </h1>
        </div>
        <Link href="/admin/new" className="btn">+ New Case</Link>
      </div>

      {!posts || posts.length === 0 ? (
        <div style={{ padding: 40, border: '1px solid var(--border-gold)', background: 'var(--bg2)', textAlign: 'center' }}>
          <p style={{ color: 'var(--cream-dim)', marginBottom: 16 }}>
            No cases filed yet. Start your first investigation.
          </p>
          <Link href="/admin/new" className="btn">File Case #001 →</Link>
        </div>
      ) : (
        <>
          <div className="list-head">
            <span>File No.</span>
            <span>Investigation</span>
            <span>Category</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {posts.map((p) => (
            <div key={p.id} className="list-row" style={{ cursor: 'default' }}>
              <div className="list-case">#{String(p.case_number).padStart(3, '0')}</div>
              <div>
                <div className="list-title">{p.title}</div>
                {p.published && p.published_at && (
                  <div className="list-blurb">Published {formatDate(p.published_at)}</div>
                )}
              </div>
              <div>{p.category && <span className="list-tag">{p.category}</span>}</div>
              <div className="list-date">
                {p.published ? (
                  <span style={{ color: 'var(--gold)' }}>● Published</span>
                ) : (
                  <span>○ Draft</span>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Link href={`/admin/edit/${p.id}`} className="list-open">Edit</Link>
                {p.published && (
                  <Link href={`/post/${p.slug}`} className="list-open" style={{ color: 'var(--cream-dim)' }}>View</Link>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </main>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
