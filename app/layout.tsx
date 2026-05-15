import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import AdminBar from '@/components/AdminBar';

export const metadata: Metadata = {
  title: "ChukkVS — The Stories They Won't Tell",
  description: 'Independent investigative dispatch. No sponsors. No filters.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="grain" />
        {/* @ts-expect-error Async Server Component */}
        <AdminBar />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
