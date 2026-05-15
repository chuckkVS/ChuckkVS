'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';

type PostInput = {
  id?: string;
  case_number?: number;
  slug?: string;
  title?: string;
  excerpt?: string;
  category?: string;
  body?: string;
  published?: boolean;
};

export default function PostEditor({
  initial,
  nextCaseNumber,
}: {
  initial?: PostInput;
  nextCaseNumber?: number;
}) {
  const router = useRouter();
  const supabase = createClient();
  const isEditing = !!initial?.id;

  const [title, setTitle] = useState(initial?.title || '');
  const [slug, setSlug] = useState(initial?.slug || '');
  const [excerpt, setExcerpt] = useState(initial?.excerpt || '');
  const [category, setCategory] = useState(initial?.category || '');
  const [body, setBody] = useState(initial?.body || '');
  const [caseNumber, setCaseNumber] = useState<number>(
    initial?.case_number ?? nextCaseNumber ?? 1
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function autoSlug(t: string) {
    return t
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 80);
  }

  function handleTitleChange(v: string) {
    setTitle(v);
    if (!isEditing && !slug) setSlug(autoSlug(v));
  }

  async function save(publish: boolean) {
    setError(null);
    setSuccess(null);
    setLoading(true);

    const finalSlug = slug.trim() || autoSlug(title);

    const payload: Record<string, unknown> = {
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim() || null,
      category: category.trim() || null,
      body,
      case_number: caseNumber,
      published: publish,
    };

    if (publish && !initial?.published) {
      payload.published_at = new Date().toISOString();
    }

    let result;
    if (isEditing) {
      result = await supabase.from('posts').update(payload).eq('id', initial!.id!).select().single();
    } else {
      result = await supabase.from('posts').insert(payload).select().single();
    }

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    setSuccess(publish ? 'Published! Redirecting…' : 'Draft saved.');

    if (!isEditing) {
      // go to edit page so further saves update instead of creating new
      router.push(`/admin/edit/${result.data.id}`);
      router.refresh();
    } else {
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!initial?.id) return;
    if (!confirm(`Delete case #${caseNumber}? This cannot be undone.`)) return;
    setLoading(true);
    const { error } = await supabase.from('posts').delete().eq('id', initial.id);
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/admin');
    router.refresh();
  }

  return (
    <main>
      <div style={{ maxWidth: 860, margin: '40px auto 80px' }}>
        <a href="/admin" className="back-link">← Back to Dashboard</a>

        <h1 style={{ fontFamily: 'Impact, sans-serif', fontSize: '2.4rem', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: 8 }}>
          {isEditing ? 'Edit' : 'New'} <span style={{ color: 'var(--red-bright)', fontStyle: 'italic' }}>Case</span>
        </h1>
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: '0.58rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 28 }}>
          ◆ Case #{String(caseNumber).padStart(3, '0')}
        </div>

        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

        <div className="field">
          <label>Case Number</label>
          <input
            type="number"
            min={1}
            value={caseNumber}
            onChange={(e) => setCaseNumber(parseInt(e.target.value, 10) || 1)}
          />
          <div className="hint">The file number shown on the case list</div>
        </div>

        <div className="field">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="ChukkVS The Story That Nobody's Covering"
          />
          <div className="hint">Tip: include "VS" in your title — it gets stylized in red automatically</div>
        </div>

        <div className="field">
          <label>URL Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(autoSlug(e.target.value))}
            placeholder="the-story-nobody-is-covering"
          />
          <div className="hint">
            Your post lives at /post/{slug || 'your-slug'}
          </div>
        </div>

        <div className="field">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">— Select —</option>
            <option value="Domestic">Domestic</option>
            <option value="International">International</option>
            <option value="Media">Media</option>
            <option value="Criminal Justice">Criminal Justice</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Politics">Politics</option>
            <option value="Environmental">Environmental</option>
            <option value="Surveillance">Surveillance</option>
            <option value="Origins">Origins</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="field">
          <label>Excerpt (short teaser for the front page)</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Two or three sentences that make someone want to read the full case."
            style={{ minHeight: 90 }}
          />
        </div>

        <div className="field editor">
          <label>Body (Markdown)</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`# Section Heading\n\nWrite your investigation here. Markdown works:\n\n**Bold text**, *italics*, [links](https://example.com)\n\n> Pull quotes use the > symbol\n\n- Bullet\n- Points\n\n## Subsections\n\nAll standard markdown works.`}
          />
          <div className="hint">
            Supports markdown: # headings, **bold**, *italics*, [links](), &gt; quotes, - lists, ```code```, and more
          </div>
        </div>

        <div className="btn-row">
          <button className="btn" onClick={() => save(true)} disabled={loading || !title.trim()}>
            {loading ? 'Saving…' : initial?.published ? 'Update & Publish' : 'Publish →'}
          </button>
          <button className="btn btn-ghost" onClick={() => save(false)} disabled={loading || !title.trim()}>
            Save as Draft
          </button>
          {isEditing && (
            <button className="btn btn-danger" onClick={handleDelete} disabled={loading} style={{ marginLeft: 'auto' }}>
              Delete Case
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
