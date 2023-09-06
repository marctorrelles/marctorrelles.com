import Image from "next/future/image"
import ReactMarkdown from "react-markdown"
import { PluggableList } from "react-markdown/lib/react-markdown"
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter"
import rehypeRaw from "rehype-raw"
import { styled } from "styled-components"
import { ThemeParams } from "../styles/theme"
import Link from "./Link"
import SubTitle from "./SubTitle"
import Text from "./Text"
import Title from "./Title"
import { useEffect, useState } from "react"

import darkStyle from "react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark"
import lightStyle from "react-syntax-highlighter/dist/cjs/styles/prism/index"

const SyntaxHighlighterComponent =
  SyntaxHighlighter as React.ComponentType<SyntaxHighlighterProps>

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

type Props = {
  children: string
}

function getColorScheme() {
  if (typeof window === "undefined") return

  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export default function MarkdownBody({ children }: Props) {
  const [colorScheme, setColorScheme] = useState<"dark" | "light">(
    getColorScheme()
  )

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const newColorScheme = event.matches ? "dark" : "light"
        setColorScheme(newColorScheme)
      })
  }, [])

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw] as PluggableList}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "")
          return !inline && match ? (
            <SyntaxHighlighterComponent
              {...props}
              children={String(children).replace(/\n$/, "")}
              customStyle={{
                borderWidth: "0",
                fontSize: "0.9rem",
              }}
              style={colorScheme === "dark" ? darkStyle : lightStyle}
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
      {children}
    </ReactMarkdown>
  )
}
