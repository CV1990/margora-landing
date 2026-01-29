"use client"

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

export function Blog() {
  const posts2026 = (posts as Post[]).filter((p) => p.date.includes("2026"))

  return (
    <section id="blog" className="py-32 bg-background relative scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
            Blog
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Ideas y tendencias en tecnología
          </h2>
          <p className="text-muted-foreground text-lg">
            Artículos sobre e-commerce, arquitectura de software y transformación digital.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts2026.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
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
          ))}
        </div>

        {posts2026.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Próximamente nuevos artículos. Revisa más adelante.
          </p>
        )}
      </div>
    </section>
  )
}
