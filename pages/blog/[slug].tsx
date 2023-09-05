import glob from "glob"
import matter from "gray-matter"
import { GetStaticPropsContext } from "next"
import Image from "next/future/image"
import ReactMarkdown from "react-markdown"
import { PluggableList } from "react-markdown/lib/react-markdown"
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs"
import rehypeRaw from "rehype-raw"
import { styled } from "styled-components"
import ClapCounter from "../../components/ClapCounter"
import Link from "../../components/Link"
import PageContainer from "../../components/PageContainer"
import Separator from "../../components/Separator"
import SubTitle from "../../components/SubTitle"
import Text from "../../components/Text"
import Title from "../../components/Title"
import { ThemeParams } from "../../styles/theme"

const SyntaxHighlighterComponent =
  SyntaxHighlighter as React.ComponentType<SyntaxHighlighterProps>

function reformatDate(fullDate: string) {
  const date = new Date(fullDate)
  return date.toLocaleDateString()
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
  padding-bottom: 1.4rem;
  display: flex;
  justify-content: center;
`

const ImageWrapper = styled.figure`
  position: relative;
  margin: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const ArticleFooter = styled.div`
  width: 100%;
  gap: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const LeftFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const RightFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: right;
`

type Props = {
  slug: string
  title: string
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
  date,
  heroImage,
  markdownBody,
  originalArticle,
  author,
}: Props) {
  return (
    <>
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
        <Separator kind="full" />
        <ArticleFooter>
          <LeftFooter>
            <ClapCounter slug={slug} />
          </LeftFooter>
          <RightFooter>
            <Text>
              {reformatDate(date)} - {author}
            </Text>
            {originalArticle && (
              <Text>
                This article was orinally posted on{" "}
                <Link href={originalArticle.link} target="_blank">
                  {originalArticle.name}
                </Link>
              </Text>
            )}
          </RightFooter>
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
