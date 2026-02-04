import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { EMPRESA, EMPRESA_SLUGS, type EmpresaSlug } from "@/data/empresa"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return EMPRESA_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const e = EMPRESA[slug as EmpresaSlug]
  if (!e) return { title: "Empresa" }
  const path = `/empresa/${slug}`
  return {
    title: e.title,
    description: e.description,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: e.title,
      description: e.description,
      url: path,
      type: "website",
      locale: "es_ES",
      siteName: "Margora",
    },
    twitter: {
      card: "summary_large_image",
      title: e.title,
      description: e.description,
    },
    alternates: { canonical: path },
  }
}

export default async function EmpresaPage({ params }: Props) {
  const { slug } = await params
  const page = EMPRESA[slug as EmpresaSlug]
  if (!page) notFound()

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/#nosotros"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a empresa
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {page.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-10">{page.description}</p>
        {page.items && page.items.length > 0 && (
          <div className="space-y-8">
            {page.items.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-border/50 bg-card/50"
              >
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h2>
                <p className="text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-14 pt-10 border-t border-border/50">
          <Link
            href="/#contacto-formulario"
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium hover:opacity-90 transition-opacity"
          >
            Contactar
          </Link>
        </div>
      </div>
    </main>
  )
}
