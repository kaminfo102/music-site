import './globals.css';
import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/navbar';
import { MusicPlayer } from '@/components/music-player';
import { Toaster } from '@/components/ui/toaster';



const vazirmatn = Vazirmatn({ subsets: ['arabic'] });

export const metadata: Metadata = {
  title: 'هارمونی - همراه موسیقی شما',
  description: 'پخش و دانلود موسیقی مورد علاقه شما، ساخت لیست پخش و کشف هنرمندان جدید.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={vazirmatn.className}>
      
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <MusicPlayer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}