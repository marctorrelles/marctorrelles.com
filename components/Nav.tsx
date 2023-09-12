import { useRouter } from "next/router"
import styled from "styled-components"

import { ThemeParams } from "../styles/theme"
import Link from "./Link"

export enum Links {
  About = "/",
  Posts = "/posts",
  RSS = "/rss.xml",
}

const Container = styled.div`
  width: 100%;
  padding: 3em;
  padding-top: 2em;
  padding-bottom: 2em;
  align-items: center;
  justify-content: center;
  > *:not(:last-child) {
    padding-bottom: 1em;
  }
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    padding: 1.5em;
    padding-bottom: 1em;
    align-items: flex-start;
  }
`

const LinksContainer = styled.div`
  > *:not(:last-child) {
    padding-right: 2em;
  }
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    > *:not(:last-child) {
      padding-bottom: 0.25em;
    }
  }
`

const Nav = () => {
  const pathname = useRouter().pathname || Links.About

  return (
    <Container>
      <LinksContainer>
        {Object.entries(Links).map(([key, value]) => {
          const active =
            value === "/" ? value === pathname : pathname.includes(value)
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
