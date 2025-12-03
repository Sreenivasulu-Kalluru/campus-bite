import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Campus Bite | Smart Canteen Automation',
    template: '%s | Campus Bite',
  },
  description:
    'Order food from your college canteen online. Skip the queue, track your order, and enjoy fresh meals with Campus Bite.',
  keywords: [
    'canteen',
    'college food',
    'online ordering',
    'campus bite',
    'food delivery',
    'student dining',
    'svu campus canteen',
    'sv university canteen tirupati',
  ],
  authors: [{ name: 'Campus Bite Team' }],
  creator: 'Campus Bite',
  publisher: 'Campus Bite',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://campus-bite.com',
    title: 'Campus Bite | Smart Canteen Automation',
    description:
      'Order food from your college canteen online. Skip the queue, track your order, and enjoy fresh meals.',
    siteName: 'Campus Bite',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'Campus Bite - Canteen Automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Campus Bite | Smart Canteen Automation',
    description:
      'Order food from your college canteen online. Skip the queue, track your order, and enjoy fresh meals.',
    images: [
      'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80',
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>{children}</body>
    </html>
  );
}
