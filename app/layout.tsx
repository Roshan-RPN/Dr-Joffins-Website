import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';
import MotionProvider from '@/components/MotionProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Dr. JOFFIN'S MULTI-SPECIALITY DENTAL CLINIC | Precision Dental Care",
  description: 'Experience high-end multi-speciality dentistry where meticulous hygiene and a gentle touch redefine your smile.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-[#0A2540] bg-white">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
