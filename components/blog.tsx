"use client"

import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import posts from "@/data/posts.json"

type Post = {
  id: string
  title: string
  date: string
  category: string
  excerpt: string
  content: string
}

/** Categorías del blog: solo negocios, tecnología y noticias (sin backend, frontend, bases de datos, etc.). */
const BLOG_ALLOWED_CATEGORIES = ["Tech News", "Negocios", "Tendencias"]

export function Blog() {
  const allPosts = posts as Post[]
  const currentYear = new Date().getFullYear().toString()
  const postsFiltered = allPosts.filter(
    (p) => p.date.includes(currentYear) && BLOG_ALLOWED_CATEGORIES.includes(p.category)
  )

  return (
    <section id="blog" className="py-32 bg-background relative scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
            Blog
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Negocios, tecnología y noticias
          </h2>
          <p className="text-muted-foreground text-lg">
            Novedades tecnológicas, tendencias y noticias para empresas. Sin contenido técnico de backend ni desarrollo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {postsFiltered.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
            >
              <Card
                className="group overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 h-full"
              >
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div className="space-y-2">
                    <Badge variant="secondary" className="rounded-full text-xs">
                      {post.category}
                    </Badge>
                    <CardTitle className="text-lg leading-tight">
                      {post.title}
                    </CardTitle>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                  <p className="text-xs text-muted-foreground mt-3">
                    {new Date(post.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {postsFiltered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Próximamente nuevos artículos sobre tecnología y negocios. Revisa más adelante.
          </p>
        )}
      </div>
    </section>
  )
}
