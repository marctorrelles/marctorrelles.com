import { useRouter } from "next/router"
import styled from "styled-components"

import { ThemeParams, darkTheme, lightTheme } from "../styles/theme"
import Link from "./Link"
import React from "react"
import HamburgerMenu from "./HamburgerMenu"
import { AnimatePresence, motion } from "framer-motion"

export enum Links {
  Home = "/",
  Blog = "/blog",
  About = "/about",
}

const Container = styled.div`
  width: 100%;
  padding: 3em;
  padding-top: 2em;
  padding-bottom: 2em;
  align-items: center;
  justify-content: center;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    padding: 1.2em;
    padding-bottom: 1em;
    align-items: flex-start;
  }
`

const DesktopContainer = styled(Container)`
  > *:not(:last-child) {
    padding-bottom: 1em;
  }
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    display: none;
  }
`

const MobileContainer = styled(Container)`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  justify-content: flex-end;
  @media (min-width: ${ThemeParams.MobileBreakpoint}px) {
    display: none;
  }
`

const LinksContainer = styled.div`
  @media (min-width: ${ThemeParams.MobileBreakpoint}px) {
    > *:not(:last-child) {
      padding-right: 2em;
    }
  }
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    flex-direction: column;
    > * {
      padding-right: 2em;
      padding-left: 2em;
      padding-bottom: 0.2em;
      padding-top: 1em;
    }
  }
`

const FullScreenContainer = motion(styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 998;
  text-align: center;
  justify-content: center;
  background-color: ${lightTheme.background};
  @media (prefers-color-scheme: dark) {
    background-color: ${darkTheme.background};
  }
`)

const Nav = () => {
  const pathname = useRouter().pathname || Links.Home
  const [open, setOpen] = React.useState(false)

  const links = (
    <LinksContainer>
      {Object.entries(Links).map(([key, value]) => {
        const active =
          value === "/" ? value === pathname : pathname.includes(value)
        return (
          <Link
            key={value}
            href={value}
            active={active}
            size={1.2}
            onClick={() => setTimeout(() => setOpen(false), 200)}
          >
            {key}
          </Link>
        )
      })}
    </LinksContainer>
  )

  return (
    <>
      <DesktopContainer>{links}</DesktopContainer>
      <MobileContainer>
        <HamburgerMenu open={open} setOpen={setOpen} />
        <AnimatePresence>
          {open && (
            <FullScreenContainer
              initial={{
                opacity: 0,
                top: -10,
              }}
              animate={{
                opacity: 1,
                top: 0,
              }}
              exit={{
                opacity: 0,
                top: -10,
              }}
            >
              {links}
            </FullScreenContainer>
          )}
        </AnimatePresence>
      </MobileContainer>
    </>
  )
}

export default Nav
