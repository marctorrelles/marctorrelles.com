import glob from "glob"
import matter from "gray-matter"
import { GetStaticPropsContext } from "next"
import Head from "next/head"
import { styled } from "styled-components"
import ArticleFooter from "../../components/ArticleFooter"
import Button from "../../components/Button"
import ClapButton from "../../components/ClapButton"
import Link from "../../components/Link"
import MarkdownBody from "../../components/MarkdownBody"
import PageContainer from "../../components/PageContainer"
import Separator from "../../components/Separator"
import Text from "../../components/Text"
import Title from "../../components/Title"
import { formatDate } from "../../lib/date"
import ShareIcon from "../../public/share.svg"

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

type Props = {
  slug: string
  title: string
  description: string
  date: string
  markdownBody: string
  originalArticle?: {
    name: string
    link: string
  }
  author: string
}

export default function Post({
  slug,
  title,
  description,
  date,
  markdownBody,
  originalArticle,
  author,
}: Props) {
  const canShare = !!global.navigator?.share

  const onShare = async () => {
    try {
      await global.navigator?.share({
        title,
        text: description,
        url: `${process.env.DOMAIN}/posts/${slug}`,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${process.env.DOMAIN}/posts/${slug}`}
          key="ogurl"
        />
      </Head>
      <PageContainer>
        <TitleWrapper>
          <Title size="big">{title}</Title>
          <Text kind="secondary">{formatDate(date)}</Text>
          {originalArticle && (
            <Text>
              This article was originally posted on{" "}
              <Link href={originalArticle.link} target="_blank">
                {originalArticle.name}
              </Link>
            </Text>
          )}
        </TitleWrapper>
        <Separator />
        <MarkdownBody>{markdownBody}</MarkdownBody>
        <Separator />
        <ArticleFooter>
          <ClapButton slug={`post-${slug}`} />
          {canShare && (
            <Button onClick={onShare}>
              <ShareIcon />
            </Button>
          )}
        </ArticleFooter>
      </PageContainer>
    </>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { slug } = context.params

  const content = await import(`../../posts/${slug}.md`)
  const data = matter(content.default)

  const props: Props = {
    slug: typeof slug === "string" ? slug : slug.at(0),
    title: data.data.title,
    description: data.data.short,
    date: data.data.date,
    author: data.data.author,
    markdownBody: data.content,
  }

  if (data.data.original_article) {
    props.originalArticle = {
      name: data.data.original_article.name,
      link: data.data.original_article.link,
    }
  }

  return { props }
}

export async function getStaticPaths() {
  const posts = glob.sync(`posts/**/*.md`)
  const postslugs = posts.map((file) =>
    file.split("/")[1].replace(/ /g, "-").slice(0, -3).trim()
  )
  const paths = postslugs.map((slug) => {
    return { params: { slug } }
  })

  return {
    paths,
    fallback: false,
  }
}
