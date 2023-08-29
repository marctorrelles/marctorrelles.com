import glob from "glob"
import matter from "gray-matter"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import Text from "../../components/atoms/Text"
import PageContainer from "../../components/organisms/PageContainer"
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs"
import { styled } from "styled-components"
import Link from "../../components/atoms/Link"
import Separator from "../../components/layout/Separator"

const SyntaxHighlighterComponent =
  SyntaxHighlighter as React.ComponentType<SyntaxHighlighterProps>

function reformatDate(fullDate) {
  const date = new Date(fullDate)
  return date.toLocaleDateString()
}

const ImageCropper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
`

const ArticleTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
`

const ArticleFooter = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`

export default function BlogTemplate({ frontmatter, markdownBody }) {
  return (
    <>
      <ImageCropper>
        <Image
          width="1920"
          height="1080"
          priority
          quality={100}
          src={frontmatter.hero_image}
          alt={`Cover: ${frontmatter.title}`}
        />
      </ImageCropper>
      <PageContainer>
        <ArticleTitle>{frontmatter.title}</ArticleTitle>
        <ReactMarkdown
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
