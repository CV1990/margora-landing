import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import posts from "@/data/posts.json"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Post = {
  id: string
  title: string
  date: string
  category: string
  excerpt: string
  content: string
}

export async function generateStaticParams() {
  return (posts as Post[]).map((post) => ({ slug: post.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = (posts as Post[]).find((p) => p.id === slug)
  if (!post) return { title: "Post no encontrado" }
  return {
    title: `${post.title} | Margora Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = (posts as Post[]).find((p) => p.id === slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-background pt-20">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Button
          variant="ghost"
          size="sm"
          className="mb-8 -ml-2 text-muted-foreground hover:text-foreground"
          asChild
        >
          <Link href="/#blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al blog
          </Link>
        </Button>

        <header className="mb-10">
          <Badge variant="secondary" className="rounded-full text-xs mb-4">
            {post.category}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            {post.title}
          </h1>
          <p className="text-muted-foreground mt-4">
            {new Date(post.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <div
          className="[&_p]:mb-4 [&_p:last-child]:mb-0 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold text-foreground/90 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  )
}
