import { styled } from "styled-components"
import Link from "../components/Link"
import Title from "../components/Title"
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

const CloseButton = styled(Link)`
  position: sticky;
  top: ${INNER_SEPARATION.Mobile}px;
  margin-left: ${INNER_SEPARATION.Mobile}px;
  z-index: 1000;
  font-size: 1.2rem;
`

const ExperienceContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 140px ${INNER_SEPARATION.Desktop}px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    padding: 100px ${INNER_SEPARATION.Mobile * 1.5}px;
  }
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
  return (
    <>
      <FullScreenContainer>
        <CloseButton href="/">← Back</CloseButton>

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
              from whom. I played a key role in developing the product,
              establishing the technology stack, and helping to build the team,
              contributing to the company's current success.
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
            </JobDescription>
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
              marketing websites to complex web and mobile applications.
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
              optimizations.
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
              using PHP, jQuery, and other web technologies.
            </JobDescription>
          </JobEntry>
        </ExperienceContainer>
      </FullScreenContainer>
    </>
  )
}
