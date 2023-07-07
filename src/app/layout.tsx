"use client"
import { Providers } from '@/redux/Provider'
import './globals.css'
import { Inter } from 'next/font/google'

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
            {children}
            <img></img>
          </main>
        </Providers>
      </body>
    </html >
  )
}