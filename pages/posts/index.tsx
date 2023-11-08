import { styled } from "styled-components"
import Link from "../../components/Link"
import PageContainer from "../../components/PageContainer"
import Text from "../../components/Text"
import Title from "../../components/Title"
import { formatDate } from "../../lib/date"
import getSortedPosts, { type Post } from "../../lib/getSortedPosts"
import { ThemeParams } from "../../styles/theme"

const StyledPosts = styled.div`
  width: 100%;
  gap: 1em;
  display: flex;
  flex-direction: column;
  @media (min-width: ${ThemeParams.MobileBreakpoint}px) {
    gap: 0.8em;
  }
`

const Post = styled.div`
  display: flex;
  flex-direction: column;
`

type Props = {
  posts: Post[]
}

export default function Posts({ posts }: Props) {
  const emptySlate = (
    <PageContainer>
      <Title>Coming soon 🔨</Title>
      <Text>I mean... yeah, very soon 🙄</Text>
    </PageContainer>
  )

  if (posts.length === 0) return emptySlate

  return (
    <PageContainer>
      <StyledPosts>
        {posts.map((post) => {
          return (
            <Post key={post.slug}>
              <Link href={`/posts/${post.slug}`} component={Title}>
                {post.title}
              </Link>
              <Text>{post.short}</Text>
              <Text kind="secondary">{formatDate(post.date)}</Text>
            </Post>
          )
        })}
      </StyledPosts>
    </PageContainer>
  )
}

export async function getStaticProps() {
  const posts = await getSortedPosts()

  return {
    props: {
      posts,
    },
  }
}
