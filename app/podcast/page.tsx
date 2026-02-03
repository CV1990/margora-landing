import type { Metadata } from "next"
import { Podcast } from "@/components/podcast"

export const metadata: Metadata = {
  title: "Podcast",
  description: "Margora Podcast: tecnología, herramientas y tips para crecer en el mundo de startups.",
}

export default function PodcastPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-20">
      <Podcast />
    </main>
  )
}
