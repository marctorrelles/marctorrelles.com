import glob from "glob"
import matter from "gray-matter"
import { GetStaticPropsContext } from "next"
import Head from "next/head"
import { styled } from "styled-components"
import ArticleFooter from "../../components/ArticleFooter"
import Button from "../../components/Button"
import ClapButton from "../../components/ClapButton"
import FadeInImage from "../../components/FadeInImage"
import MarkdownBody from "../../components/MarkdownBody"
import PageContainer from "../../components/PageContainer"
import Separator from "../../components/Separator"
import Text from "../../components/Text"
import Title from "../../components/Title"
import ShareIcon from "../../public/share.svg"
import { ThemeParams } from "../../styles/theme"

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2em;
`

const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }
`

type Props = {
  slug: string
  title: string
  description: string
  date: string
  markdownBody: string
  cover: string
  squareImage: boolean
}

export default function Post({
  slug,
  title,
  description,
  markdownBody,
}: Props) {
  const canShare = !!global.navigator?.share

  const onShare = async () => {
    try {
      await global.navigator?.share({
        title,
        text: description,
        url: `${process.env.DOMAIN}/work/${slug}`,
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
          content={`${process.env.DOMAIN}/work/${slug}`}
          key="ogurl"
        />
      </Head>
      <PageContainer>
        <TitleWrapper>
          <TitleContent>
            <TitleContent>
              <Title size="big">{title}</Title>
              <Text>{description}</Text>
            </TitleContent>
          </TitleContent>
        </TitleWrapper>
        <Separator />
        <MarkdownBody imgNoPadding>{markdownBody}</MarkdownBody>
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

  const content = await import(`../../work/${slug}.md`)
  const data = matter(content.default)

  const props: Props = {
    slug: typeof slug === "string" ? slug : slug.at(0),
    title: data.data.title,
    description: data.data.short,
    date: data.data.date,
    cover: data.data.cover,
    squareImage: data.data.square_image ?? false,
    markdownBody: data.content,
  }

  if (props.cover[0] !== "/") {
    props.cover = "/" + props.cover
  }

  return { props }
}

export async function getStaticPaths() {
  const work = glob.sync(`work/**/*.md`)
  const worklugs = work.map((file) =>
    file.split("/")[1].replace(/ /g, "-").slice(0, -3).trim()
  )
  const paths = worklugs.map((slug) => {
    return { params: { slug } }
  })

  return {
    paths,
    fallback: false,
  }
}
