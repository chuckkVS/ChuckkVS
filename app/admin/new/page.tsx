import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import PostEditor from '@/components/PostEditor';

export const revalidate = 0;

export default async function NewPostPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: latest } = await supabase
    .from('posts')
    .select('case_number')
    .order('case_number', { ascending: false })
    .limit(1);

  const nextCaseNumber = (latest && latest[0]?.case_number ? latest[0].case_number + 1 : 1);

  return <PostEditor nextCaseNumber={nextCaseNumber} />;
}
