import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { RECURSOS, RECURSOS_SLUGS, type RecursoSlug } from "@/data/recursos"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return RECURSOS_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const r = RECURSOS[slug as RecursoSlug]
  if (!r) return { title: "Recursos" }
  const path = `/recursos/${slug}`
  return {
    title: r.title,
    description: r.description,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: r.title,
      description: r.description,
      url: path,
      type: "website",
      locale: "es_ES",
      siteName: "Margora",
    },
    twitter: {
      card: "summary_large_image",
      title: r.title,
      description: r.description,
    },
    alternates: { canonical: path },
  }
}

export default async function RecursoPage({ params }: Props) {
  const { slug } = await params
  const page = RECURSOS[slug as RecursoSlug]
  if (!page) notFound()

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a recursos
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {page.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-10">{page.description}</p>
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
        <div className="mt-14 pt-10 border-t border-border/50">
          <Link
            href="/#newsletter"
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium hover:opacity-90 transition-opacity"
          >
            Suscribirse al newsletter
          </Link>
        </div>
      </div>
    </main>
  )
}
