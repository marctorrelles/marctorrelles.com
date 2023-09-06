import styled from "styled-components"
import EmailIcon from "../public/email.svg"
import GithubIcon from "../public/github.svg"
import RssIcon from "../public/rss.svg"
import TwitterIcon from "../public/twitter.svg"
import Link from "./Link"
import Note from "./Note"

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2em;
  width: 100%;
  > *:not(:last-child) {
    padding-bottom: 1em;
  }
`

const LinksContainer = styled.div`
  ustify-content: center;
  align-items: center;
  > *:not(:last-child) {
    padding-right: 2em;
  }
`

enum Social {
  github = "https://github.com/marctorrelles",
  twitter = "https://twitter.com/marctorrelles",
  email = "mailto:marctorrelles@gmail.com",
  rss = "/rss.xml",
}

type SocialKey = keyof typeof Social

const getIcon = (icon: keyof typeof Social) => {
  switch (icon) {
    case "github":
      return <GithubIcon />
    case "twitter":
      return <TwitterIcon />
    case "email":
      return <EmailIcon />
    case "rss":
      return <RssIcon />
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
