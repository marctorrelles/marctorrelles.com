import glob from "glob"
import matter from "gray-matter"
import { styled } from "styled-components"
import Link from "../components/atoms/Link"
import Text from "../components/atoms/Text"
import Title from "../components/atoms/Title"
import Separator from "../components/layout/Separator"
import PageContainer from "../components/organisms/PageContainer"
import React from "react"

const PostCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`

const Description = styled.p`
  margin-block-end: 0;
`

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

  return (
    <PageContainer>
      {posts.length === 0 && emptySlate}
      {posts.length > 0 &&
        posts.map((post, index) => {
          return (
            <React.Fragment key={post.slug}>
              <PostCard>
                <Link href={`/blog/${post.slug}`}>
                  <Title>{post.title}</Title>
                </Link>
                <Description>{post.short}</Description>
                <Link href={`/blog/${post.slug}`}>Read more {">"}</Link>
              </PostCard>
              {index !== posts.length - 1 && <Separator />}
            </React.Fragment>
          )
        })}
    </PageContainer>
  )
}

export async function getStaticProps() {
  const blogs = glob.sync(`posts/**/*.md`)
  const blogSlugs = blogs.map((file) =>
    file.split("/")[1].replace(/ /g, "-").slice(0, -3).trim()
  )
  const posts = await Promise.all(
    blogSlugs.map(async (slug) => {
      const content = await import(`posts/${slug}.md`)
      const data = matter(content.default)

      return {
        slug,
        body: data.content,
        title: data.data.title,
        short: data.data.short,
      }
    })
  )

  return {
    props: {
      posts,
    },
  }
}
