import styled from "styled-components"
import EmailIcon from "../public/icons/email.svg"
import GithubIcon from "../public/icons/github.svg"
import RssIcon from "../public/icons/rss.svg"
import LinkedInIcon from "../public/icons/linkedin.svg"
import Link from "./Link"
import Note from "./Note"
import { lightTheme } from "../styles/theme"

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2em;
  width: 100%;
  > *:not(:last-child) {
    padding-bottom: 1em;
  }
  fill: ${lightTheme.dark};
`

const LinksContainer = styled.div`
  ustify-content: center;
  align-items: center;
  > *:not(:last-child) {
    padding-right: 2em;
  }
`

enum Social {
  rss = "/rss.xml",
  github = "https://github.com/marctorrelles",
  linkedin = "https://www.linkedin.com/in/marctorrelles/",
  email = "mailto:marctorrelles@gmail.com",
}

type SocialKey = keyof typeof Social

const getIcon = (icon: keyof typeof Social) => {
  switch (icon) {
    case "rss":
      return <RssIcon />
    case "github":
      return <GithubIcon />
    case "linkedin":
      return <LinkedInIcon />
    case "email":
      return <EmailIcon />
  }
}

const NextLink = () => (
  <Link href="https://nextjs.org/" target="_blank">
    Next.js
  </Link>
)
const VercelLink = () => (
  <Link href="https://www.vercel.com/" target="_blank">
    Vercel
  </Link>
)

const Footer = () => (
  <Container>
    <LinksContainer>
      {Object.entries(Social).map(
        ([key, value]: [SocialKey, (typeof Social)[SocialKey]]) => (
          <Link key={key} href={value} active={false} target="_blank">
            {getIcon(key)}
          </Link>
        )
      )}
    </LinksContainer>
    <Note>
      Made with ♥︎ using <NextLink /> and <VercelLink />
    </Note>
  </Container>
)

export default Footer
