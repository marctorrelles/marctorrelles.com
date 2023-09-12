import { useRouter } from "next/router"
import styled from "styled-components"

import { ThemeParams } from "../styles/theme"
import Link from "./Link"

enum LeftLinks {
  About = "/",
}

enum RightLinks {
  Posts = "/posts",
  RSS = "/rss.xml",
}

export const Links = {
  ...LeftLinks,
  ...RightLinks,
}

const Container = styled.div`
  width: 100%;
  padding: 3em;
  padding-top: 2em;
  padding-bottom: 2em;
  max-width: 800px;
  align-items: center;
  justify-content: space-between;
  gap: 2em;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    padding: 1.5em;
    padding-bottom: 1em;
    align-items: flex-start;
  }
`

const LinksContainer = styled.div`
  gap: 1.4em;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    > *:not(:last-child) {
      padding-bottom: 0.25em;
    }
  }
`

const Nav = () => {
  const pathname = useRouter().pathname || LeftLinks.About

  return (
    <Container>
      <LinksContainer>
        {Object.entries(LeftLinks).map(([key, value]) => {
          const active = value === pathname
          return (
            <Link key={value} href={value} active={active} size={1.2}>
              {key}
            </Link>
          )
        })}
      </LinksContainer>
      <LinksContainer>
        {Object.entries(RightLinks).map(([key, value]) => {
          const active = value === pathname
          return (
            <Link key={value} href={value} active={active} size={1.2}>
              {key}
            </Link>
          )
        })}
      </LinksContainer>
    </Container>
  )
}

export default Nav
