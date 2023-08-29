import glob from "glob"
import matter from "gray-matter"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import Title from "../../components/atoms/Title"
import PageContainer from "../../components/organisms/PageContainer"
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs"

const SyntaxHighlighterComponent =
  SyntaxHighlighter as React.ComponentType<SyntaxHighlighterProps>

function reformatDate(fullDate) {
  const date = new Date(fullDate)
  return date.toLocaleDateString()
}

export default function BlogTemplate({ frontmatter, markdownBody, siteTitle }) {
  return (
    <PageContainer>
      <Title>{siteTitle}</Title>
      <article>
        <Image
          width="1920"
          height="1080"
          priority
          quality={100}
          src="/webpack-to-vite.jpg"
          alt={`Cover: ${frontmatter.title}`}
        />
        <div>
          <h1>{frontmatter.title}</h1>
        </div>
        <p>
          {reformatDate(frontmatter.date)} - {frontmatter.author}
        </p>
        <div style={{ flexDirection: "column" }}>
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
            }}
          >
            {markdownBody}
          </ReactMarkdown>
        </div>
        <h2>Written By: {frontmatter.author}</h2>
      </article>
    </PageContainer>
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
