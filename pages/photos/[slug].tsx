import { GetStaticPropsContext } from "next"
import { styled } from "styled-components"
import ArticleFooter from "../../components/ArticleFooter"
import Button from "../../components/Button"
import ClapButton from "../../components/ClapButton"
import FadeInImage from "../../components/FadeInImage"
import PageContainer from "../../components/PageContainer"
import Separator from "../../components/Separator"
import Text from "../../components/Text"
import Title from "../../components/Title"
import { formatDate } from "../../lib/date"
import type { PhotoSet } from "../../lib/getSortedPhotos"
import getSortedPhotos, { getPhotoSet } from "../../lib/getSortedPhotos"
import ShareIcon from "../../public/share.svg"
import { ThemeParams } from "../../styles/theme"

type Props = {
  photoSet: PhotoSet
}

const PhotoSet = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3em;
  @media (min-width: ${ThemeParams.MobileBreakpoint}px) {
    1.5em;
  }
`

export default function Post({ photoSet }: Props) {
  const { title, author, photos, date, slug } = photoSet

  const canShare = !!global.navigator?.share

  const onShare = async () => {
    try {
      await global.navigator?.share({
        title,
        text: `${title} Photos`,
        url: `${process.env.DOMAIN}/posts/${slug}`,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <PageContainer>
      <Title size="big">{title}</Title>
      <Text kind="secondary">{formatDate(date)}</Text>
      <Separator />
      <PhotoSet>
        {photos.map((photo, index) => (
          <FadeInImage
            key={photo}
            src={photo}
            width={800}
            height={600}
            priority={index < 3}
            alt={photo.split("/").pop().split(".").shift() || ""}
          />
        ))}
      </PhotoSet>
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
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { slug } = context.params || {}
  const photoSet = await getPhotoSet(slug as string)

  return {
    props: {
      photoSet,
    },
  }
}

export async function getStaticPaths() {
  const photoSet = await getSortedPhotos()
  const paths = photoSet.map(({ slug }) => {
    return {
      params: {
        slug,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
