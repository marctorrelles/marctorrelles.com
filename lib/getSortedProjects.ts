import glob from "glob"
import matter from "gray-matter"

export type Project = {
  slug: string
  title: string
  short: string
  date: string
  body: string
  cover: string
  squareImage?: boolean
  cta?: {
    link: string
    text: string
  }
}

export default async function getSortedProjects(): Promise<Project[]> {
  const mdFiles = glob.sync("projects/**/*.md")
  const slugs = mdFiles.map((file) =>
    file.split("/")[1].replace(/ /g, "-").slice(0, -3).trim()
  )
  const projects = (
    await Promise.all(
      slugs.map(async (slug) => {
        const content = await import(`projects/${slug}.md`)
        const data = matter(content.default)

        if (data.data.hidden && process.env.NODE_ENV !== "development") {
          return null
        }

        const project: Project = {
          slug,
          body: data.content,
          title: data.data.title,
          short: data.data.short,
          cover: data.data.cover,
          date: data.data.date,
          squareImage: data.data.square_image ?? false,
        }

        if (data.data.cta_link && data.data.cta_text) {
          project.cta = {
            link: data.data.cta_link,
            text: data.data.cta_text,
          }
        }

        return project
      })
    )
  )
    .filter(Boolean)
    .sort((a, b) => {
      if (!a || !b) return 0
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return projects
}
