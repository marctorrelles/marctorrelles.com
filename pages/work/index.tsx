import { styled } from "styled-components"
import FadeInImage from "../../components/FadeInImage"
import Link from "../../components/Link"
import PageContainer from "../../components/PageContainer"
import Text from "../../components/Text"
import Title from "../../components/Title"
import { formatDate } from "../../lib/date"
import getSortedWork, { Work } from "../../lib/getSortedWork"
import { ThemeParams } from "../../styles/theme"

const StyledPhotos = styled.div`
  width: 100%;
  gap: 1em;
  display: flex;
  flex-direction: column;
  @media (min-width: ${ThemeParams.MobileBreakpoint}px) {
    gap: 0.8em;
  }
`

const SquareImage = styled.div`
  min-width: 140px;
  min-height: 140px;
  max-width: 140px;
  max-height: 140px;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    min-width: 100px;
    min-height: 100px;
    max-width: 100px;
    max-height: 100px;
  }
`

const WorkComponent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2em;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    flex-direction: column;
    gap: 0.8em;
  }
`

const WorkInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`

type Props = {
  works: Work[]
}

export default function works({ works }: Props) {
  return (
    <PageContainer>
      <StyledPhotos>
        {works.map((work, index) => {
          return (
            <WorkComponent key={work.title}>
              {work.squareImage && (
                <Link href={`/work/${work.slug}`}>
                  <SquareImage>
                    <FadeInImage
                      src={work.cover}
                      alt={work.title}
                      width={400}
                      height={400}
                      priority={index < 3}
                    />
                  </SquareImage>
                </Link>
              )}
              <WorkInfo>
                <Link href={`/work/${work.slug}`} component={Title}>
                  {work.title}
                </Link>
                <Text>{work.short}</Text>
                {work.cta && (
                  <Link href={work.cta.link} component={Text} target="_blank">
                    {work.cta.text}
                  </Link>
                )}
                <Text kind="secondary">{formatDate(work.date)}</Text>
              </WorkInfo>
            </WorkComponent>
          )
        })}
      </StyledPhotos>
    </PageContainer>
  )
}

export async function getStaticProps() {
  const works = await getSortedWork()

  return {
    props: {
      works,
    },
  }
}
