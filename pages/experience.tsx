import { motion } from "framer-motion"
import { styled } from "styled-components"
import Link from "../components/Link"
import Title from "../components/Title"
import {
  INNER_SEPARATION,
  ThemeParams,
  darkTheme,
  lightTheme,
} from "../styles/theme"

const FullScreenContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${lightTheme.background};
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;

  @media (prefers-color-scheme: dark) {
    background: ${darkTheme.background};
  }
`

const CloseButton = styled(Link)`
  position: fixed;
  top: ${INNER_SEPARATION.Mobile}px;
  left: ${INNER_SEPARATION.Mobile}px;
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
      <FullScreenContainer
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <CloseButton href="/">← Back</CloseButton>

        <ExperienceContainer>
          <Title size="normal">Experience</Title>
          <JobEntry>
            <JobHeader>
              <Link href="https://permut.com" target="_blank">
                <Title size="small">Permut</Title>
              </Link>
              <JobPeriod>Feb 2024 - Now</JobPeriod>
            </JobHeader>
            <JobDescription>
              As the first employee at Permut, I contributed to our mission of
              enhancing efficiency for manufacturing companies. We identified a
              key challenge in procurement: determining what to buy, when, and
              from whom. I played a central figure in developing the product,
              establishing the technology and building the team, shaping the
              company's current success.
            </JobDescription>
          </JobEntry>
          <JobSeparator />
          <JobEntry>
            <JobHeader>
              <Link href="https://factorialhr.com" target="_blank">
                <Title size="small">Factorial HR</Title>
              </Link>
              <JobPeriod>Jan 2020 - Oct 2023</JobPeriod>
            </JobHeader>
            <JobDescription>
              Responsible for shaping the technological landscape of the
              company's digital platforms. Using React and Ruby on Rails, I
              played a pivotal role in several teams, both product facing but
              also platform related.
            </JobDescription>
          </JobEntry>
          <JobSeparator />
          <JobEntry>
            <JobHeader>
              <Link href="https://quipu.com" target="_blank">
                <Title size="small">Quipu</Title>
              </Link>
              <JobPeriod>Feb 2019 - Jan 2020</JobPeriod>
            </JobHeader>
            <JobDescription>
              Responsible for building a new vertical of the product, using
              React and React Native and with collaboration between different
              teams.
            </JobDescription>
          </JobEntry>
          <JobSeparator />
          <JobEntry>
            <JobHeader>
              <Title size="small">Freelance</Title>
              <JobPeriod>Sep 2018 - Feb 2019</JobPeriod>
            </JobHeader>
            <JobDescription>
              In charge of several digital products, mainly building websites
              but also some larger applications, both in web and mobile devices.
            </JobDescription>
          </JobEntry>
          <JobSeparator />
          <JobEntry>
            <JobHeader>
              <Title size="small">Fuelbanner</Title>
              <JobPeriod>Sep 2017 - Sep 2018</JobPeriod>
            </JobHeader>
            <JobDescription>
              In charge of maintaining the company product using React and
              ActionHero.js.
            </JobDescription>
          </JobEntry>
          <JobSeparator />
          <JobEntry>
            <JobHeader>
              <Link href="https://parlem.com/" target="_blank">
                <Title size="small">Parlem</Title>
              </Link>
              <JobPeriod>Mar 2017 - Sep 2017</JobPeriod>
            </JobHeader>
            <JobDescription>
              In charge of building and maintaining the company internal tools,
              as well as the public page.
            </JobDescription>
          </JobEntry>
          <JobSeparator />
          <JobEntry>
            <JobHeader>
              <Link href="https://4tickets.cat" target="_blank">
                <Title size="small">4Tickets</Title>
              </Link>
              <JobPeriod>Oct 2013 - Mar 2017</JobPeriod>
            </JobHeader>
            <JobDescription>
              In charge of building several webpages, as well as maintaining the
              current ones using PHP, jQuery along other technologies.
            </JobDescription>
          </JobEntry>
        </ExperienceContainer>
      </FullScreenContainer>
    </>
  )
}
