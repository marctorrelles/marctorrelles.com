import glob from "glob"
import matter from "gray-matter"
import Image from "next/future/image"
import ReactMarkdown from "react-markdown"
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs"
import rehypeRaw from "rehype-raw"
import { styled } from "styled-components"
import Link from "../../components/Link"
import PageContainer from "../../components/PageContainer"
import Separator from "../../components/Separator"
import SubTitle from "../../components/SubTitle"
import Text from "../../components/Text"
import Title from "../../components/Title"
import { ThemeParams } from "../../styles/theme"
import { PluggableList } from "react-markdown/lib/react-markdown"

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
`

const ImageWrapper = styled.figure`
  position: relative;
  margin: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const ArticleFooter = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`

export default function BlogTemplate({ frontmatter, markdownBody }) {
  return (
    <>
      <HeroImage>
        <Image
          width="1920"
          height="1080"
          priority
          quality={100}
          loading="eager"
          src={frontmatter.hero_image}
          alt={`Cover: ${frontmatter.title}`}
        />
      </HeroImage>
      <PageContainer>
        <TitleWrapper>
          <Title size="big">{frontmatter.title}</Title>
        </TitleWrapper>
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
        <Separator />
        <ArticleFooter>
          {frontmatter.original_article && (
            <Text>
              This article was orinally posted on{" "}
              <Link href={frontmatter.original_article.link} target="_blank">
                {frontmatter.original_article.name}
              </Link>
            </Text>
          )}
          <Text>
            {reformatDate(frontmatter.date)} - {frontmatter.author}
          </Text>
        </ArticleFooter>
      </PageContainer>
    </>
  )
}

export async function getStaticProps(context) {
  const { slug } = context.params

  const content = await import(`../../posts/${slug}.md`)
  const data = matter(content.default)

  return {
    props: {
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}

export async function getStaticPaths() {
  const blogs = glob.sync(`posts/**/*.md`)
  const blogSlugs = blogs.map((file) =>
    file.split("/")[1].replace(/ /g, "-").slice(0, -3).trim()
  )
  const paths = blogSlugs.map((slug) => {
    return { params: { slug: slug } }
  })

  return {
    paths,
    fallback: false,
  }
}
