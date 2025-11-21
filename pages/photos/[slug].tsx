import { GetStaticPropsContext } from "next"
import { useState } from "react"
import { styled } from "styled-components"
import FadeInImage from "../../components/FadeInImage"
import FullscreenImageViewer from "../../components/FullscreenImageViewer"
import PageContainer from "../../components/PageContainer"
import Separator from "../../components/Separator"
import Text from "../../components/Text"
import Title from "../../components/Title"
import { formatDate } from "../../lib/date"
import type { PhotoSet } from "../../lib/getSortedPhotos"
import getSortedPhotos, { getPhotoSet } from "../../lib/getSortedPhotos"
import { ThemeParams } from "../../styles/theme"

type Props = {
  photoSet: PhotoSet
}

const PhotoSet = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3em;
  @media (min-width: ${ThemeParams.MobileBreakpoint}px) {
    gap: 1.5em;
  }
`

const ClickableImage = styled.div`
  cursor: pointer;
  width: 100%;
`

export default function Post({ photoSet }: Props) {
  const { title, photos, date } = photoSet
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)

  const handleImageClick = (photo: string) => {
    setFullscreenImage(photo)
    setIsFullscreenOpen(true)
  }

  const handleCloseFullscreen = () => {
    setIsFullscreenOpen(false)
    // Delay clearing the image data to allow fade-out animation
    setTimeout(() => {
      setFullscreenImage(null)
    }, 450) // Match animation duration
  }

  const getFullscreenImageData = () => {
    if (!fullscreenImage) return null
    
    // Use large dimensions to allow image to display at natural size
    // CSS will constrain it to viewport and natural width
    return {
      src: fullscreenImage,
      alt: fullscreenImage.split("/").pop()?.split(".").shift() || "",
      width: 4000, // Large enough to not constrain most images
      height: 3000, // Aspect ratio hint, will be constrained by CSS
    }
  }

  const fullscreenData = getFullscreenImageData()

  return (
    <PageContainer>
      <Title size="big">{title}</Title>
      <Text kind="secondary">{formatDate(date)}</Text>
      <Separator />
      <PhotoSet>
        {photos.map((photo, index) => (
          <ClickableImage
            key={photo}
            onClick={() => handleImageClick(photo)}
          >
            <FadeInImage
              src={photo}
              width={800}
              height={600}
              priority={index < 3}
              alt={photo.split("/").pop()?.split(".").shift() || ""}
            />
          </ClickableImage>
        ))}
      </PhotoSet>
      {fullscreenData && (
        <FullscreenImageViewer
          src={fullscreenData.src}
          alt={fullscreenData.alt}
          width={fullscreenData.width}
          height={fullscreenData.height}
          isOpen={isFullscreenOpen}
          onClose={handleCloseFullscreen}
        />
      )}
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
