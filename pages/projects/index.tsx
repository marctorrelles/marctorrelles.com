import { styled } from "styled-components"
import FadeInImage from "../../components/FadeInImage"
import Link from "../../components/Link"
import PageContainer from "../../components/PageContainer"
import Text from "../../components/Text"
import Title from "../../components/Title"
import { formatDate } from "../../lib/date"
import getSortedProjects, { Project } from "../../lib/getSortedProjects"
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
  min-width: 200px;
  min-height: 200px;
  max-width: 200px;
  max-height: 200px;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    min-width: 160px;
    min-height: 160px;
    max-width: 160px;
    max-height: 160px;
  }
`

const ProjectComponent = styled.div`
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

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`

type Props = {
  projects: Project[]
}

export default function Projects({ projects }: Props) {
  return (
    <PageContainer>
      <StyledPhotos>
        {projects.map((project, index) => {
          return (
            <ProjectComponent key={project.title}>
              {project.squareImage && (
                <Link href={`/projects/${project.slug}`}>
                  <SquareImage>
                    <FadeInImage
                      src={project.cover}
                      alt={project.title}
                      width={400}
                      height={400}
                      priority={index < 3}
                    />
                  </SquareImage>
                </Link>
              )}
              <ProjectInfo>
                <Link href={`/projects/${project.slug}`} component={Title}>
                  {project.title}
                </Link>
                <Text>{project.short}</Text>
                {project.cta && (
                  <Link
                    href={project.cta.link}
                    component={Text}
                    target="_blank"
                  >
                    {project.cta.text}
                  </Link>
                )}
                <Text kind="secondary">{formatDate(project.date)}</Text>
              </ProjectInfo>
            </ProjectComponent>
          )
        })}
      </StyledPhotos>
    </PageContainer>
  )
}

export async function getStaticProps() {
  const projects = await getSortedProjects()

  return {
    props: {
      projects,
    },
  }
}
