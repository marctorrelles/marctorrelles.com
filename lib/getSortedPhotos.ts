import fs from "fs"
import glob from "glob"
import matter from "gray-matter"

export type PhotoSet = {
  slug: string
  title: string
  author: string
  date: string
  photos: string[]
  cover: string
}

function getPublicUrl(path: string) {
  return path.replace("public", "")
}

export async function getPhotoSet(slug: string) {
  const content = await import(`photos/${slug}.md`)
  const data = matter(content.default)

  if (data.data.hidden && process.env.NODE_ENV !== "development") {
    return null
  }

  const photos = fs
    .readdirSync(data.data.path)
    .map((file) => {
      return getPublicUrl(`${data.data.path}/${file}`)
    })
    .filter((_file) => {
      const file = _file.toLowerCase()
      return (
        file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".png")
      )
    })
  const cover = getPublicUrl(data.data.cover)

  const { title, author, date } = data.data

  return {
    slug,
    title,
    author,
    date,
    photos,
    cover,
  }
}

export default async function getSortedPhotos(): Promise<PhotoSet[]> {
  const mdFiles = glob.sync(`photos/*.md`)
  const slugs = mdFiles.map((file) =>
    file.split("/")[1].replace(/ /g, "-").slice(0, -3).trim()
  )
  const photos = (
    await Promise.all(slugs.map((slug) => getPhotoSet(slug)))
  ).filter(Boolean)

  const sortedPhotos = photos.sort((a, b) => {
    if (!a || !b) return 0
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return sortedPhotos
}
