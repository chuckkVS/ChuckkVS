import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import PostEditor from '@/components/PostEditor';

export const revalidate = 0;

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!post) notFound();

  return <PostEditor initial={post} />;
}
