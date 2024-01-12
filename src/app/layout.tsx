import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import ModelContextProvider from '@/context/ModelContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'nineAI',
  description: 'An AI web client for AI models',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <ModelContextProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </ModelContextProvider>
    </ClerkProvider>
  )
}
