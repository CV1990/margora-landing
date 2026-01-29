import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Margora | Consultoría de Software & Transformación Digital',
  description: 'Margora ofrece servicios de consultoría de software, desarrollo web, e-commerce, XR/Meta Quest, migración AWS, aplicaciones móviles, marketing digital y gestión de equipos ágiles.',
  generator: 'v0.app',
  icons: {
    icon: '/assets/icons/icon.ico',
    apple: '/assets/icons/icon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
