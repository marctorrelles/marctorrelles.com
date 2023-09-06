import glob from "glob"
import matter from "gray-matter"
import { GetStaticPropsContext } from "next"
import Image from "next/future/image"
import Head from "next/head"
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter"
import { styled } from "styled-components"
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
import { ThemeParams } from "../../styles/theme"

const HeroImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    height: 200px;
  }
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ArticleFooter = styled.div`
  width: 100%;
  gap: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    gap: 0rem;
  }
`

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: auto;
`

type Props = {
  slug: string
  title: string
  description: string
  date: string
  markdownBody: string
  heroImage: string
  originalArticle?: {
    name: string
    link: string
  }
  author: string
}

export default function BlogTemplate({
  slug,
  title,
  description,
  date,
  heroImage,
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
        url: `${process.env.DOMAIN}/blog/${slug}`,
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
        <meta property="og:image" content={heroImage} key="ogimage" />
        <meta
          property="og:url"
          content={`${process.env.DOMAIN}/blog/${slug}`}
          key="ogurl"
        />
      </Head>
      <HeroImage>
        <Image
          width="1920"
          height="1080"
          priority
          quality={100}
          loading="eager"
          src={heroImage}
          alt={`Cover: ${title}`}
        />
      </HeroImage>
      <PageContainer>
        <TitleWrapper>
          <Title size="big">{title}</Title>
          <InfoContainer>
            <Text>{author}</Text>
            <Text>{formatDate(date)}</Text>
          </InfoContainer>
        </TitleWrapper>
        <Separator />
        <MarkdownBody>{markdownBody}</MarkdownBody>
        <Separator />
        <ArticleFooter>
          <InfoContainer>
            <ClapButton slug={slug} />
            {canShare && (
              <Button onClick={onShare}>
                <ShareIcon />
              </Button>
            )}
          </InfoContainer>
          {originalArticle && (
            <Text>
              This article was orinally posted on{" "}
              <Link href={originalArticle.link} target="_blank">
                {originalArticle.name}
              </Link>
            </Text>
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
    heroImage: data.data.hero_image,
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
  const blogs = glob.sync(`posts/**/*.md`)
  const blogSlugs = blogs.map((file) =>
    file.split("/")[1].replace(/ /g, "-").slice(0, -3).trim()
  )
  const paths = blogSlugs.map((slug) => {
    return { params: { slug } }
  })

  return {
    paths,
    fallback: false,
  }
}
