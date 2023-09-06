import fs from "fs"
import RSS from "rss"
import getSortedPosts from "./getSortedPosts"

export default async function generateRssFeed() {
  const siteUrl = process.env.DOMAIN
  const posts = await getSortedPosts()

  const feedOptions = {
    title: "marctorrelles blog",
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss.xml`,
    image_url: `${siteUrl}/favicon.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Marc Torrelles`,
  }

  const feed = new RSS(feedOptions)

  posts.map((post) => {
    feed.item({
      title: post.title,
      description: post.short,
      url: `${siteUrl}/posts/${post.slug}`,
      date: post.date,
    })
  })

  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }))
}
