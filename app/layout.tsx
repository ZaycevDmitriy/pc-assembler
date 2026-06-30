import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Roboto } from 'next/font/google';

import { cn } from '@/lib/utils';
import './globals.css';
import Header from '@/components/header';

const roboto = Roboto({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ПК Сборщик',
  description: 'Собери свой ПК мечты.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        roboto.variable,
        'dark',
      )}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
