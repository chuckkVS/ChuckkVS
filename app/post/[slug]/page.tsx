import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createClient } from '@/lib/supabase-server';

export const revalidate = 0;

export default async function PostPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (!post) notFound();

  return (
    <main>
      <article className="post-wrap">
        <Link href="/" className="back-link">← Back to All Cases</Link>

        <div className="post-eyebrow">
          <span className="case-no">
            Case #{String(post.case_number).padStart(3, '0')}
          </span>
          <span className="sep">◆</span>
          <span className="date">
            {post.published_at ? formatDate(post.published_at) : 'Unpublished'}
          </span>
        </div>

        {post.category && <div className="post-tag">{post.category}</div>}

        <h1 className="post-title" dangerouslySetInnerHTML={{ __html: stylizeTitle(post.title) }} />

        {post.excerpt && <div className="post-excerpt">{post.excerpt}</div>}

        <div className="post-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.body || ''}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}

function stylizeTitle(title: string) {
  const escaped = title
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped.replace(/\bVS\b/g, '<span class="vs-i">VS</span>');
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
