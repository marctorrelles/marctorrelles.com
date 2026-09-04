import { styled } from "styled-components"
import FadeInImage from "../components/FadeInImage"
import Link from "../components/Link"
import PageContainer from "../components/PageContainer"
import Separator from "../components/Separator"
import Text from "../components/Text"
import Title from "../components/Title"
import {
  INNER_SEPARATION,
  ThemeParams,
  darkTheme,
  lightTheme,
} from "../styles/theme"

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-top: 2rem;

  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    padding-top: 0.5rem;
    gap: 1.5rem;
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

const ProjectLinks = ({
  links,
}: {
  links: { label: string; href: string }[]
}) => (
  <DownloadLinks>
    {links.map((l, i) => (
      <span key={l.href}>
        {i > 0 && " - "}
        <PlatformLink href={l.href} target="_blank">
          {l.label}
        </PlatformLink>
      </span>
    ))}
  </DownloadLinks>
)

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

// Bleeds out of the text column to the edges of the scroll container, like a Notion gallery
const ProjectImageGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100cqw;
  margin-left: -${INNER_SEPARATION.Desktop}px;
  padding-left: ${INNER_SEPARATION.Desktop}px;
  padding-right: ${INNER_SEPARATION.Desktop}px;
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
    margin-left: -${INNER_SEPARATION.Mobile}px;
    padding-left: ${INNER_SEPARATION.Mobile}px;
    padding-right: ${INNER_SEPARATION.Mobile}px;
  }
`

const ProjectImage = styled.div<{ $wide?: boolean }>`
  position: relative;
  min-width: 200px;
  width: ${(p) => (p.$wide ? "480px" : "240px")};
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    min-width: 240px;
    width: ${(p) => (p.$wide ? "360px" : "240px")};
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
            <Title size="normal" noMargin>
              Sideload
            </Title>
            <ProjectLinks
              links={[
                { label: "Web", href: "https://sideload.marctorrelles.com" },
                {
                  label: "GitHub",
                  href: "https://github.com/marctorrelles/sideload",
                },
              ]}
            />
          </ProjectHeader>
          <ProjectImageGrid>
            <ProjectImage $wide>
              <FadeInImage
                src="/projects/sideload/1.webp"
                alt="Sideload landing page"
                width={800}
                height={563}
              />
            </ProjectImage>
            <ProjectImage $wide>
              <FadeInImage
                src="/projects/sideload/2.webp"
                alt="Sideload: choose what to move"
                width={800}
                height={563}
              />
            </ProjectImage>
            <ProjectImage $wide>
              <FadeInImage
                src="/projects/sideload/3.webp"
                alt="Sideload: a transfer running"
                width={800}
                height={563}
              />
            </ProjectImage>
          </ProjectImageGrid>
          <ProjectContent>
            <DescriptionText>
              Sideload moves your Spotify library to YouTube Music. Playlists,
              liked songs, saved albums, followed artists. Start it, close the
              tab, come back to a finished library.
              <br />
              What makes it different is what it refuses to lose: every add is
              read back and verified, and anything it cannot match with
              confidence comes back to you as a list, never guessed.
              <br />
              Free, open source, no accounts, nothing kept.
            </DescriptionText>
            <TechStack>
              <TechBadge>TypeScript</TechBadge>
              <TechBadge>Astro</TechBadge>
              <TechBadge>Cloudflare Workers</TechBadge>
              <TechBadge>Durable Objects</TechBadge>
              <TechBadge>Open Source</TechBadge>
            </TechStack>
          </ProjectContent>
        </Project>
        <Separator />
        <Project>
          <ProjectHeader>
            <Title size="normal" noMargin>
              Caliu
            </Title>
            <ProjectLinks
              links={[
                { label: "Web", href: "https://caliuapp.com" },
                {
                  label: "App Store",
                  href: "https://apps.apple.com/app/caliu-a-notes-app/id6761850487",
                },
              ]}
            />
          </ProjectHeader>
          <ProjectImageGrid>
            <ProjectImage>
              <FadeInImage
                src="/projects/caliu/1.png"
                alt="Caliu screenshot 1"
                width={400}
                height={870}
              />
            </ProjectImage>
            <ProjectImage>
              <FadeInImage
                src="/projects/caliu/2.png"
                alt="Caliu screenshot 2"
                width={400}
                height={870}
              />
            </ProjectImage>
            <ProjectImage>
              <FadeInImage
                src="/projects/caliu/3.png"
                alt="Caliu screenshot 3"
                width={400}
                height={870}
              />
            </ProjectImage>
          </ProjectImageGrid>
          <ProjectContent>
            <DescriptionText>
              I take a lot of notes. Ideas, lists, half-written things I come
              back to months later. For years I bounced between apps: Bear
              looked right but was Apple only, Obsidian did everything and felt
              like work, and the rest wanted me online all the time. At some
              point I stopped looking and started building.
              <br />
              Caliu is a Markdown notes app that feels like a quiet page. Your
              notes live on your device first, work fully offline, and sync in
              the background when there is a connection. Organisation is
              hashtags, not folders: write #work/project inside a note and it
              belongs there. Pin a reminder to a note and it finds you on
              whatever device you pick up. Talk to it and it writes clean
              Markdown. And because I wanted my own tools to reach my notes, it
              ships with a REST API and an MCP server, so Claude or Cursor can
              read and write them too.
              <br />
              It runs natively on iPhone, iPad, Mac and Apple Watch, and on the
              web. It's the app I open every morning, which is the only real
              reason it exists.
            </DescriptionText>
            <TechStack>
              <TechBadge>Swift</TechBadge>
              <TechBadge>SwiftUI</TechBadge>
              <TechBadge>React</TechBadge>
              <TechBadge>TypeScript</TechBadge>
              <TechBadge>Cloudflare Workers</TechBadge>
              <TechBadge>MCP</TechBadge>
            </TechStack>
          </ProjectContent>
        </Project>
        <Separator />
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
            <ProjectLinks
              links={[
                {
                  label: "App Store",
                  href: "https://apps.apple.com/cr/app/flexo-focus-y-pomodoro/id6469589285",
                },
              ]}
            />
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
