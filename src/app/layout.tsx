"use client"
import { Providers } from '@/redux/Provider';
import { Inter } from 'next/font/google';
import './globals.css';
import NextNProgress from 'nextjs-progressbar';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={``}>
      <body className={inter.className}>
        <Providers>
          <main className='max-w-3xl mx-auto'>
            <NextNProgress />
            {children}
          </main>
        </Providers>
      </body>
    </html >
  )
}