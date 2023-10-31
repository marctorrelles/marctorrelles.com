import { styled } from "styled-components"
import FadeInImage from "../components/FadeInImage"
import Link from "../components/Link"
import PageContainer from "../components/PageContainer"
import Separator from "../components/Separator"
import Text from "../components/Text"
import Title from "../components/Title"
import { formatDate } from "../lib/date"
import getSortedPhotos, { PhotoSet } from "../lib/getSortedPhotos"
import { ThemeParams } from "../styles/theme"

const StyledPhotos = styled.div`
  width: 100%;
  gap: 1em;
  display: flex;
  flex-direction: column;
  @media (min-width: ${ThemeParams.MobileBreakpoint}px) {
    gap: 0.8em;
  }
`

const PhotoSet = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`

type Props = {
  photoSet: PhotoSet[]
}

export default function Photos({ photoSet }: Props) {
  return (
    <PageContainer>
      <StyledPhotos>
        {photoSet.map((photo, index) => {
          return (
            <PhotoSet key={photo.title}>
              <Link href={`/photos/${photo.slug}`} component={Title}>
                {photo.title}
              </Link>
              <Link href={`/photos/${photo.slug}`}>
                <FadeInImage
                  src={photo.cover}
                  alt={photo.title}
                  width={800}
                  height={600}
                  priority={index < 3}
                />
              </Link>
              <Text kind="secondary">{formatDate(photo.date)}</Text>
              {index !== photoSet.length - 1 && <Separator />}
            </PhotoSet>
          )
        })}
      </StyledPhotos>
    </PageContainer>
  )
}

export async function getStaticProps() {
  const photoSet = await getSortedPhotos()

  return {
    props: {
      photoSet,
    },
  }
}
