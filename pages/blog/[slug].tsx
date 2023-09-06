import glob from "glob"
import matter from "gray-matter"
import { GetStaticPropsContext } from "next"
import Image from "next/future/image"
import Head from "next/head"
import ReactMarkdown from "react-markdown"
import { PluggableList } from "react-markdown/lib/react-markdown"
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs"
import rehypeRaw from "rehype-raw"
import { styled } from "styled-components"
import ClapButton from "../../components/ClapButton"
import Link from "../../components/Link"
import PageContainer from "../../components/PageContainer"
import Separator from "../../components/Separator"
import SubTitle from "../../components/SubTitle"
import Text from "../../components/Text"
import Title from "../../components/Title"
import ShareIcon from "../../public/share.svg"
import { ThemeParams } from "../../styles/theme"
import Button from "../../components/Button"

const SyntaxHighlighterComponent =
  SyntaxHighlighter as React.ComponentType<SyntaxHighlighterProps>

function reformatDate(fullDate: string) {
  const date = new Date(fullDate)
  return date.toLocaleDateString("en")
}

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

const ImageWrapper = styled.figure`
  position: relative;
  margin: 0;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    padding-left: 0;
    padding-right: 0;
  }
`

const Em = styled(Text)`
  font-size: 1rem;
  font-style: italic;
  text-align: center;
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
            <Text>{reformatDate(date)}</Text>
          </InfoContainer>
        </TitleWrapper>
        <Separator />
        <ReactMarkdown
          rehypePlugins={[rehypeRaw] as PluggableList}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "")
              return !inline && match ? (
                <SyntaxHighlighterComponent
                  {...props}
                  children={String(children).replace(/\n$/, "")}
                  style={atomOneDark}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              )
            },
            p({ children }) {
              return <Text>{children}</Text>
            },
            a({ children, href }) {
              return (
                <Link href={href} target="_blank">
                  {children}
                </Link>
              )
            },
            em({ children }) {
              return <Em>{children}</Em>
            },
            h1({ children }) {
              return <Title>{children}</Title>
            },
            h2({ children }) {
              return <SubTitle>{children}</SubTitle>
            },
            img({ src, alt }) {
              return (
                <ImageWrapper>
                  <Image
                    src={src}
                    alt={alt}
                    width={976}
                    height={732}
                    loading="lazy"
                  />
                </ImageWrapper>
              )
            },
          }}
        >
          {markdownBody}
        </ReactMarkdown>
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
