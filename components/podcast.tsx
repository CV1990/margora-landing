"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Headphones, Loader2, ExternalLink } from "lucide-react"

type Episode = {
  id: string
  title: string
  link: string
  audioUrl: string
  pubDate: string
  description: string
  duration?: string
}

type Feed = {
  title: string
  description: string
  link: string
} | null

export function Podcast() {
  const [feed, setFeed] = useState<Feed>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/podcast")
      .then((res) => res.json())
      .then((data) => {
        setFeed(data.feed ?? null)
        setEpisodes(data.episodes ?? [])
      })
      .catch(() => setError("No se pudo cargar el podcast"))
      .finally(() => setLoading(false))
  }, [])

  function formatDuration(duration: string | undefined): string {
    if (!duration) return ""
    if (/^\d+$/.test(duration)) {
      const m = Math.floor(Number(duration) / 60)
      const s = Number(duration) % 60
      return `${m}:${s.toString().padStart(2, "0")}`
    }
    return duration
  }

  if (loading) {
    return (
      <section id="podcast" className="py-32 bg-background relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              Podcast
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Margora Podcast
            </h2>
          </div>
          <div className="flex justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
          </div>
        </div>
      </section>
    )
  }

  if (error || (!feed && episodes.length === 0)) {
    return (
      <section id="podcast" className="py-32 bg-background relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              Podcast
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Margora Podcast
            </h2>
            <p className="text-muted-foreground">
              {error ?? "Próximamente episodios. Revisa más adelante."}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="podcast" className="py-32 bg-background relative scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
            Podcast
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            {feed?.title ?? "Margora Podcast"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {feed?.description ?? "Tecnología, herramientas y tips para crecer en el mundo de startups."}
          </p>
          {feed?.link && (
            <a
              href={feed.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
            >
              Escuchar en Spotify <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {episodes.map((ep) => (
            <Card
              key={ep.id}
              className="overflow-hidden border-border/50 hover:border-primary/30 transition-colors"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2 rounded-xl bg-primary/10 shrink-0">
                      <Headphones className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-lg leading-tight line-clamp-2">
                        {ep.title}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">
                          {ep.pubDate
                            ? new Date(ep.pubDate).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : ""}
                        </span>
                        {ep.duration && (
                          <Badge variant="secondary" className="rounded-full text-xs font-normal">
                            {formatDuration(ep.duration)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {ep.link && (
                    <a
                      href={ep.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Abrir episodio"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </CardHeader>
              {ep.description && (
                <CardContent className="pt-0">
                  <CardDescription className="line-clamp-2 text-sm">
                    {ep.description}
                  </CardDescription>
                </CardContent>
              )}
              {ep.audioUrl && (
                <CardContent className="pt-2 pb-6">
                  <audio
                    src={ep.audioUrl}
                    controls
                    preload="metadata"
                    className="w-full h-10 accent-primary"
                  >
                    Tu navegador no soporta el elemento de audio.
                  </audio>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {episodes.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Aún no hay episodios. Revisa más adelante.
          </p>
        )}
      </div>
    </section>
  )
}
