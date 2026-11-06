import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import './globals.css';

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-ubuntu',
});

export const metadata: Metadata = {
  title: 'PaDi Design System',
  description: 'PaDi design system documentation and component previews',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ubuntu.variable}>
      <body className={ubuntu.className}>{children}</body>
    </html>
  );
}

