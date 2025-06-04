import fs from "fs"
import glob from "glob"
import matter from "gray-matter"
import path from "path"

export type Post = {
  slug: string
  body: string
  title: string
  short: string
  date: string
}

export default async function getSortedPosts(): Promise<Post[]> {
  const mdFiles = glob.sync(`posts/**/*.md`)
  const slugs = mdFiles.map((file) =>
    file.split("/")[1].replace(/ /g, "-").slice(0, -3).trim()
  )
  const posts = (
    await Promise.all(
      slugs.map(async (slug) => {
        const filePath = path.join(process.cwd(), "posts", `${slug}.md`)
        const content = fs.readFileSync(filePath, "utf8")
        const data = matter(content)

        if (data.data.hidden && process.env.NODE_ENV !== "development") {
          return null
        }

        return {
          slug,
          body: data.content,
          title: data.data.title,
          short: data.data.short,
          date: data.data.date,
        }
      })
    )
  )
    .filter(Boolean)
    .sort((a, b) => {
      if (!a || !b) return 0
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return posts
}
