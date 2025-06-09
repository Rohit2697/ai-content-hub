import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { cookies } from 'next/headers';


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AI Knowledge Hub',
  description: 'AI-generated knowledge articles platform',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cokkieStore = await cookies()
  const token = cokkieStore.get('token')?.value;


  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {token && <Navbar />}
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
          <main className="max-w-5xl mx-auto py-12 px-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
