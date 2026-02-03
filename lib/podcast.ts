import Parser from "rss-parser"

const parser = new Parser({
  timeout: 10000,
  headers: { "User-Agent": "MargoraPodcast/1.0" },
})

export type PodcastEpisode = {
  id: string
  title: string
  link: string
  audioUrl: string
  pubDate: string
  description: string
  duration?: string
}

export type PodcastFeed = {
  title: string
  description: string
  link: string
  episodes: PodcastEpisode[]
}

/**
 * Obtiene y parsea el feed RSS del podcast.
 * Usar solo en servidor (API route o Server Component).
 */
export async function getPodcastFeed(feedUrl: string): Promise<PodcastFeed | null> {
  try {
    const feed = await parser.parseURL(feedUrl)

    const episodes: PodcastEpisode[] = (feed.items || []).map((item, index) => {
      const enclosure = item.enclosures?.find(
        (e) => e.type?.startsWith("audio/") || e.url?.match(/\.(mp3|m4a|ogg|wav)(\?|$)/i)
      )
      const audioUrl = enclosure?.url ?? ""
      const guid = item.guid || item.link || `ep-${index}`
      const id = typeof guid === "string" ? guid : (guid as { _?: string })?._

      return {
        id: id || `ep-${index}`,
        title: item.title ?? "Sin título",
        link: item.link ?? "",
        audioUrl,
        pubDate: item.pubDate ?? item.isoDate ?? "",
        description: item.contentSnippet || (item.content ?? "").replace(/<[^>]+>/g, "").slice(0, 300) || "",
        duration: (item as { itunes?: { duration?: string } }).itunes?.duration,
      }
    })

    return {
      title: feed.title ?? "Podcast",
      description: feed.description ?? "",
      link: feed.link ?? "",
      episodes,
    }
  } catch (err) {
    console.error("[podcast] Error fetching feed:", err)
    return null
  }
}
