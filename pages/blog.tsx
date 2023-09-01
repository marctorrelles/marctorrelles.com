import glob from "glob"
import matter from "gray-matter"
import React from "react"
import Link from "../components/Link"
import Text from "../components/Text"
import Title from "../components/Title"
import Separator from "../components/Separator"
import PageContainer from "../components/PageContainer"

type Post = {
  slug: string
  body: string
  title: string
  short: string
}

type Props = {
  posts: Post[]
}

export default function Blog({ posts }: Props) {
  const emptySlate = (
    <>
      <Title>Coming soon 🔨</Title>
      <Text>I mean... yeah, very soon 🙄</Text>
    </>
  )

  if (posts.length === 0) return emptySlate

  return posts.map((post, index) => {
    return (
      <React.Fragment key={post.slug}>
        <PageContainer>
          <Link href={`/blog/${post.slug}`} component={Title}>
            {post.title}
          </Link>
          <Text>{post.short}</Text>
          <Text>
            <Link href={`/blog/${post.slug}`}>Read more {">"}</Link>
          </Text>
        </PageContainer>
        {index !== posts.length - 1 && <Separator />}
      </React.Fragment>
    )
  })
}

export async function getStaticProps() {
  const mdFiles = glob.sync(`posts/**/*.md`)
  const slugs = mdFiles.map((file) =>
    file.split("/")[1].replace(/ /g, "-").slice(0, -3).trim()
  )
  const posts = (await Promise.all(
    slugs.map(async (slug) => {
      const content = await import(`posts/${slug}.md`)
      const data = matter(content.default)

      if (data.data.hidden && process.env.NODE_ENV !== 'development') {
        return null
      }

      return {
        slug,
        body: data.content,
        title: data.data.title,
        short: data.data.short,
      }
    })
  )).filter(Boolean)

  return {
    props: {
      posts,
    },
  }
}
