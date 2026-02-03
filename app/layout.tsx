import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { EnvProvider } from '@/components/env-provider'
import { CookieConsentBanner } from '@/components/cookie-consent-banner'
import { AnalyticsWithConsent } from '@/components/analytics-with-consent'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://margora.com'

export const metadata: Metadata = {
  title: {
    default: 'Margora | Empresa de Software y Proveedor de Desarrollo Web a la Medida',
    template: '%s | Margora',
  },
  description: 'Empresa de software y proveedor de desarrollo a la medida. ¿Quién me puede hacer un sitio web? Margora: desarrollo web a la medida, sitios web personalizados, consultoría de software, e-commerce, apps móviles y transformación digital.',
  keywords: [
    'proveedor de software',
    'empresa de software',
    'desarrollo web a la medida',
    'sitio web a la medida',
    'quién me puede hacer un sitio web',
    'donde hacer un sitio web a la medida',
    'desarrollo de sitios web',
    'crear sitio web profesional',
    'empresa desarrollo web',
    'consultoría de software',
    'transformación digital',
    'desarrollo de software a medida',
    'agencia de desarrollo web',
  ],
  authors: [{ name: 'Margora', url: siteUrl }],
  creator: 'Margora',
  publisher: 'Margora',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: 'Margora',
    title: 'Margora | Empresa de Software y Desarrollo Web a la Medida',
    description: 'Proveedor de software y desarrollo web a la medida. ¿Buscas quién te haga un sitio web? Desarrollo de sitios web personalizados, e-commerce, apps y consultoría.',
    images: [{ url: '/placeholder-logo.svg', width: 1200, height: 630, alt: 'Margora - Empresa de Software' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Margora | Empresa de Software y Desarrollo Web a la Medida',
    description: 'Proveedor de software, desarrollo web a la medida y sitios web personalizados.',
  },
  alternates: {
    canonical: siteUrl,
  },
  generator: 'v0.app',
  icons: {
    icon: '/assets/icons/icon.ico',
    apple: '/assets/icons/icon.ico',
  },
  metadataBase: new URL(siteUrl),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://margora.com'}#organization`,
      name: 'Margora',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://margora.com',
      description: 'Empresa de software y proveedor de desarrollo web a la medida. Consultoría de software, sitios web personalizados, desarrollo a medida y transformación digital.',
      logo: { '@type': 'ImageObject', url: '/placeholder-logo.svg' },
      sameAs: [
        'https://www.linkedin.com/company/margora-ac/',
        'https://www.facebook.com/margoraConsultora',
        'https://www.instagram.com/consultoramargora/',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://margora.com'}#service`,
      name: 'Margora - Empresa de Software y Desarrollo Web a la Medida',
      description: 'Proveedor de software. ¿Quién me puede hacer un sitio web? Desarrollo web a la medida, sitios web a la medida, donde hacer un sitio web a la medida. Empresa de software y consultoría.',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://margora.com',
      provider: { '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://margora.com'}#organization` },
      areaServed: 'MX',
      serviceType: [
        'Desarrollo web a la medida',
        'Sitio web a la medida',
        'Proveedor de software',
        'Empresa de software',
        'Consultoría de software',
        'Desarrollo de software',
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <EnvProvider web3FormsKey={web3FormsKey}>
          {children}
          <CookieConsentBanner />
          <AnalyticsWithConsent />
        </EnvProvider>
      </body>
    </html>
  )
}
