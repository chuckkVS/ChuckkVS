import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';

export default async function AdminBar() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  return (
    <div className="admin-bar">
      <span className="admin-label">◆ Editor Mode — {user.email}</span>
      <div className="admin-links">
        <Link href="/admin">Dashboard</Link>
        <span style={{ color: 'var(--border-gold)' }}>|</span>
        <Link href="/admin/new">New Case</Link>
        <span style={{ color: 'var(--border-gold)' }}>|</span>
        <form action="/api/auth/signout" method="post" style={{ display: 'inline' }}>
          <button type="submit">Sign Out</button>
        </form>
      </div>
    </div>
  );
}
