import { useEffect, useState } from "react"
import { styled } from "styled-components"
import Link from "../components/Link"
import PageContainer from "../components/PageContainer"
import Title from "../components/Title"
import { useNav } from "../styles/NavProvider"
import {
  INNER_SEPARATION,
  ThemeParams,
  darkTheme,
  lightTheme,
} from "../styles/theme"

const FullScreenContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
`

const CloseButton = styled(Link)<{ $navOpen: boolean }>`
  position: sticky;
  top: ${INNER_SEPARATION.Mobile}px;
  margin-left: ${INNER_SEPARATION.Mobile}px;
  z-index: 1000;
  font-size: 1.2rem;
  width: fit-content;
  opacity: ${({ $navOpen }) => ($navOpen ? 0 : 1)};
  transform: translateX(${({ $navOpen }) => ($navOpen ? "20px" : "0")});
  transition: opacity 0.25s ease-in-out, transform 0.2s ease-in-out;
`

const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`

const JobEntry = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`

const JobPeriod = styled.span`
  font-style: italic;
  color: ${lightTheme.secondary};
  font-size: 1rem;

  @media (prefers-color-scheme: dark) {
    color: ${darkTheme.secondary};
  }
`

const JobDescription = styled.p`
  font-size: 1.1rem;
  color: ${lightTheme.primary};

  @media (prefers-color-scheme: dark) {
    color: ${darkTheme.primary};
  }

  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    font-size: 1rem;
  }
`

const JobSeparator = styled.div`
  height: 1px;
  background: ${lightTheme.primary};
  opacity: 0.2;
  width: 100%;

  @media (prefers-color-scheme: dark) {
    background: ${darkTheme.primary};
  }
`

export default function Experience() {
  const { navOpen } = useNav()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <FullScreenContainer>
      <CloseButton href="/" $navOpen={mounted ? navOpen : false}>
        ← Back
      </CloseButton>
      <PageContainer>
        <ExperienceContainer>
          <Title size="normal">Experience</Title>
          <JobEntry>
            <JobHeader>
              <Link href="https://permut.com" target="_blank">
                <Title size="small" noMargin>
                  Permut
                </Title>
              </Link>
              <JobPeriod>Feb 2024 - Now</JobPeriod>
            </JobHeader>
            <JobDescription>
              As the first employee at Permut, I contributed to our mission of
              enhancing efficiency for manufacturing companies. We identified a
              key challenge in procurement: determining what to buy, when, and
              from whom.
              <br />
              After that, we did a 180-degree turn and pivoted to build an
              AI-native customer engagement platform. Now, we develop autonomous
              agents that create human-like, on-brand conversations to manage
              acquisition, support, and retention.
            </JobDescription>
          </JobEntry>
          <JobSeparator />
          <JobEntry>
            <JobHeader>
              <Link href="https://factorialhr.com" target="_blank">
                <Title size="small" noMargin>
                  Factorial HR
                </Title>
              </Link>
              <JobPeriod>Jan 2020 - Oct 2023</JobPeriod>
            </JobHeader>
            <JobDescription>
              Responsible for shaping the technological landscape of the
              company's digital platforms. Using React and Ruby on Rails, I
              played a pivotal role across several teams, contributing to both
              product-facing features and platform infrastructure.
              <br />
              Some cool things I did there include migrating from{" "}
              <Link
                href="https://labs.factorialhr.com/posts/from-webpack-to-vite"
                target="_blank"
              >
                webpack to Vite{" "}
              </Link>
              {" and helping building a "}
              <Link href="https://swc.rs" target="_blank">
                declarative resource-oriented registry for Ruby
              </Link>
              , amongst many other product-facing features.
            </JobDescription>
            <JobDescription></JobDescription>
          </JobEntry>
          <JobSeparator />
          <JobEntry>
            <JobHeader>
              <Link href="https://quipu.com" target="_blank">
                <Title size="small" noMargin>
                  Quipu
                </Title>
              </Link>
              <JobPeriod>Feb 2019 - Jan 2020</JobPeriod>
            </JobHeader>
            <JobDescription>
              Led the development of a new product vertical, building
              cross-platform solutions using React and React Native.
              Collaborated across multiple teams to deliver new features.
            </JobDescription>
          </JobEntry>
          <JobSeparator />
          <JobEntry>
            <JobHeader>
              <Title size="small" noMargin>
                Freelance
              </Title>
              <JobPeriod>Sep 2018 - Feb 2019</JobPeriod>
            </JobHeader>
            <JobDescription>
              Delivered digital solutions for various clients, ranging from
              marketing websites to complex web and mobile applications. Didn't
              work that well because, well, let's say it was a bit
              client-intensive.
            </JobDescription>
          </JobEntry>
          <JobSeparator />
          <JobEntry>
            <JobHeader>
              <Title size="small" noMargin>
                Fuelbanner
              </Title>
              <JobPeriod>Sep 2017 - Sep 2018</JobPeriod>
            </JobHeader>
            <JobDescription>
              Maintained and enhanced the company's advertising platform using
              React and ActionHero.js. Implemented new features and performance
              optimizations. Worked on a really small team, which pushed me quit
              quite a lot on discovering things on my own.
            </JobDescription>
          </JobEntry>
          <JobSeparator />
          <JobEntry>
            <JobHeader>
              <Link href="https://parlem.com/" target="_blank">
                <Title size="small" noMargin>
                  Parlem
                </Title>
              </Link>
              <JobPeriod>Mar 2017 - Sep 2017</JobPeriod>
            </JobHeader>
            <JobDescription>
              Developed and maintained internal tools and the public-facing
              website, focusing on efficient workflows and user-friendly
              interfaces.
            </JobDescription>
          </JobEntry>
          <JobSeparator />
          <JobEntry>
            <JobHeader>
              <Link href="https://4tickets.cat" target="_blank">
                <Title size="small" noMargin>
                  4Tickets
                </Title>
              </Link>
              <JobPeriod>Oct 2013 - Mar 2017</JobPeriod>
            </JobHeader>
            <JobDescription>
              Built and maintained multiple client websites and web applications
              using basic JavaScript and a lot of CSS, but also some good old
              LAMP stack.
            </JobDescription>
          </JobEntry>
        </ExperienceContainer>
      </PageContainer>
    </FullScreenContainer>
  )
}
