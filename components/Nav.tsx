import { useRouter } from "next/router"
import styled from "styled-components"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { ThemeParams, darkTheme, lightTheme } from "../styles/theme"
import Link from "./Link"

export const NAV_HEIGHT = {
  regular: "4.8em",
  mobile: "4em",
}

enum LeftLinks {
  About = "/",
}

enum RightLinks {
  Posts = "/posts",
  Projects = "/projects",
  Photos = "/photos",
  RSS = "/rss.xml",
}

export const Links = {
  ...LeftLinks,
  ...RightLinks,
}

const Container = motion(styled.div`
  width: 100%;
  height: ${NAV_HEIGHT.regular};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  background-color: ${lightTheme.background};
  z-index: 1;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    height: ${NAV_HEIGHT.mobile};
  }
  @media (prefers-color-scheme: dark) {
    background-color: ${darkTheme.background};
  }
`)

const ContainerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  gap: 2em;
  padding-left: 3em;
  padding-right: 3em;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
`

const LinksContainer = styled.div`
  gap: 1.4em;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    font-size: 0.9em;
    gap: 1.2em;
    > *:not(:last-child) {
      padding-bottom: 0.25em;
    }
  }
`

const Nav = () => {
  const pathname = useRouter().pathname || LeftLinks.About
  const [isHidden, setIsHidden] = useState(false)
  const prevScrollY = useRef(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    function onScroll() {
      const currentScrollY = window.scrollY
      const isScrollingUp = currentScrollY < prevScrollY.current
      const isBelowThreshold = currentScrollY > 80

      setIsHidden(!isScrollingUp && isBelowThreshold)

      prevScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", onScroll)

    return () => {
      removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <Container
      variants={{
        hidden: { y: "-100%" },
        visible: { y: 0 },
      }}
      animate={isHidden ? "hidden" : "visible"}
      initial={false}
      transition={{
        type: "just",
      }}
    >
      <ContainerContent>
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
      </ContainerContent>
    </Container>
  )
}

export default Nav
