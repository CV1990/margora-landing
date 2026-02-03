import { NextResponse } from "next/server"
import { getPodcastFeedUrl } from "@/lib/env"
import { getPodcastFeed } from "@/lib/podcast"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  const feedUrl = getPodcastFeedUrl()
  if (!feedUrl) {
    return NextResponse.json({ feed: null, episodes: [] })
  }

  const feed = await getPodcastFeed(feedUrl)
  if (!feed) {
    return NextResponse.json({ feed: null, episodes: [] }, { status: 200 })
  }

  return NextResponse.json({
    feed: {
      title: feed.title,
      description: feed.description,
      link: feed.link,
    },
    episodes: feed.episodes,
  })
}
