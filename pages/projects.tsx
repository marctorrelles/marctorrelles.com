import { styled } from "styled-components"
import FadeInImage from "../components/FadeInImage"
import Link from "../components/Link"
import PageContainer from "../components/PageContainer"
import Separator from "../components/Separator"
import Text from "../components/Text"
import Title from "../components/Title"
import { ThemeParams, darkTheme, lightTheme } from "../styles/theme"

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8rem;

  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    gap: 3rem;
  }
`

const Project = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ProjectHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-between;
`

const DownloadLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  opacity: 0.7;
`

const PlatformLink = styled(Link)`
  transition: opacity 0.2s ease;
  font-size: 0.9rem;
  padding: 0;
  border-bottom: none;

  > a {
    padding: 0;
    border-bottom: none;
  }

  &:hover {
    opacity: 1;
  }
`

const DiscontinuedBadge = styled.span`
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  background: ${lightTheme.secondary}22;
  color: ${lightTheme.secondary};
  white-space: nowrap;

  @media (prefers-color-scheme: dark) {
    background: ${darkTheme.secondary}22;
    color: ${darkTheme.secondary};
  }
`

const DiscontinuedNote = styled.p`
  margin: 0;
  font-size: 0.95rem;
  font-style: italic;
  color: ${lightTheme.secondary};

  @media (prefers-color-scheme: dark) {
    color: ${darkTheme.secondary};
  }
`

const ProjectImageGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 0.5rem;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    gap: 0.75rem;
  }
`

const ProjectImage = styled.div`
  position: relative;
  min-width: 200px;
  width: 240px;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    min-width: 240px;
    width: 240px;
  }
`

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const DescriptionText = styled(Text)`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${lightTheme.primary};

  @media (prefers-color-scheme: dark) {
    color: ${darkTheme.primary};
  }

  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    font-size: 1rem;
  }
`

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

const TechBadge = styled.span`
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  background: ${lightTheme.primary}22;
  color: ${lightTheme.primary};

  @media (prefers-color-scheme: dark) {
    background: ${darkTheme.primary}22;
    color: ${darkTheme.primary};
  }
`

export default function Projects() {
  return (
    <PageContainer>
      <ProjectsContainer>
        <Project>
          <ProjectHeader>
            <Title size="normal">Gustosa</Title>
            <DiscontinuedBadge>No longer available</DiscontinuedBadge>
          </ProjectHeader>
          <ProjectImageGrid>
            <ProjectImage>
              <FadeInImage
                src="/projects/gustosa/1.png"
                alt="Gustosa screenshot 1"
                width={400}
                height={870}
              />
            </ProjectImage>
            <ProjectImage>
              <FadeInImage
                src="/projects/gustosa/2.png"
                alt="Gustosa screenshot 2"
                width={400}
                height={870}
              />
            </ProjectImage>
            <ProjectImage>
              <FadeInImage
                src="/projects/gustosa/3.png"
                alt="Gustosa screenshot 3"
                width={400}
                height={870}
              />
            </ProjectImage>
          </ProjectImageGrid>
          <ProjectContent>
            <DiscontinuedNote>
              Gustosa is no longer available on the App Store or Play Store.
            </DiscontinuedNote>
            <DescriptionText>
              My idea was clear: I wanted to build an app that uses AI and that
              my mother would use. After that, things came naturally.
              <br />
              Gustosa was my first personal approach to AI. I wanted to build
              something that felt genuinely useful—not just a tech demo, but
              something people would actually use in their daily lives. Cooking
              seemed like the perfect domain: it's personal, creative, and
              everyone has their own preferences and constraints. Also, I played
              a lot with image generation, which was pretty fun.
              <br />
              The app uses AI to recommend personalized recipes based on what
              you have in your fridge, how much time you have, and your cooking
              level. You can create and customize your own recipes, import them
              from any website, and build your personal recipe collection. Share
              your dishes with friends, discover what they're cooking, and
              follow step-by-step instructions with nutritional information.
            </DescriptionText>
            <TechStack>
              <TechBadge>Expo</TechBadge>
              <TechBadge>React Native</TechBadge>
              <TechBadge>Node.js</TechBadge>
              <TechBadge>AI</TechBadge>
            </TechStack>
          </ProjectContent>
        </Project>
        <Separator />
        <Project>
          <ProjectHeader>
            <Title size="normal" noMargin>
              Flexo
            </Title>
            <DownloadLinks>
              Download on the{" "}
              <PlatformLink
                href="https://apps.apple.com/cr/app/flexo-focus-y-pomodoro/id6469589285"
                target="_blank"
              >
                App Store
              </PlatformLink>
            </DownloadLinks>
          </ProjectHeader>
          <ProjectImageGrid>
            <ProjectImage>
              <FadeInImage
                src="/projects/flexo/1.png"
                alt="Flexo screenshot 1"
                width={400}
                height={867}
              />
            </ProjectImage>
            <ProjectImage>
              <FadeInImage
                src="/projects/flexo/2.png"
                alt="Flexo screenshot 2"
                width={400}
                height={867}
              />
            </ProjectImage>
            <ProjectImage>
              <FadeInImage
                src="/projects/flexo/3.png"
                alt="Flexo screenshot 3"
                width={400}
                height={867}
              />
            </ProjectImage>
          </ProjectImageGrid>
          <ProjectContent>
            <DescriptionText>
              I've always been curious about iOS development, and after years of
              building web apps, I wanted to try something completely different.
              Flexo was my first Swift experiment—a chance to explore native iOS
              development, learn SwiftUI, and build something useful at the same
              time.
              <br />
              The Pomodoro Technique has been a game-changer for my own
              productivity, so I thought: why not build a beautiful, simple app
              that helps others focus too? One more, you might say. And yeah, it
              kinda was, but I focused on making it beautifully and simple. I'm
              pretty happy with the result, and it's totally free.
            </DescriptionText>
            <TechStack>
              <TechBadge>Swift</TechBadge>
              <TechBadge>SwiftUI</TechBadge>
              <TechBadge>iOS</TechBadge>
            </TechStack>
          </ProjectContent>
        </Project>
      </ProjectsContainer>
    </PageContainer>
  )
}
