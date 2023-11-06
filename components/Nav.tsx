import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router"
import { useEffect } from "react"
import styled from "styled-components"
import { useNav } from "../styles/NavProvider"
import {
  INNER_SEPARATION,
  ThemeParams,
  darkTheme,
  lightTheme,
} from "../styles/theme"
import Link from "./Link"

export const NAV_HEIGHT = {
  regular: "4.8em",
  mobile: "4em",
}

export enum Links {
  About = "/",
  Posts = "/posts",
  Projects = "/projects",
  Photos = "/photos",
}

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: ${INNER_SEPARATION.Desktop}px;
  z-index: 2;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    display: none;
    font-size: 0.9em;
    padding: ${INNER_SEPARATION.Mobile}px;
  }
`

const MobileContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  z-index: 2;
  top: 0;
  left: 0;
  padding: ${INNER_SEPARATION.Mobile}px;
  display: none;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    display: inherit;
  }
`

const BarWrapper = styled.div<{ open: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  height: 1.2em;
  width: 1.4em;
  cursor: pointer;
  z-index: 3;
  position: absolute;
  top: ${INNER_SEPARATION.Mobile + 8}px;
  right: ${INNER_SEPARATION.Mobile}px;
  transform: ${({ open }) => (open ? "rotate(90deg)" : "rotate(0deg)")};
  transition: all 0.25s ease-in-out;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    display: flex;
  }
`

const Bar = styled(motion.div)<{ open: boolean }>`
  width: 100%;
  height: 2px;
  background-color: ${lightTheme.primary};
  @media (prefers-color-scheme: dark) {
    background-color: ${darkTheme.primary};
  }
  transform-origin: 1.4em;
  transition: all 0.25s ease-in-out;
  &:nth-child(2) {
    width: 75%;
    ${({ open }) => open && "width: 100%;"}
  }
`

function MobileControls() {
  const { navOpen, setNavOpen } = useNav()

  return (
    <BarWrapper open={navOpen} onClick={() => setNavOpen(!navOpen)}>
      <Bar open={navOpen} />
      <Bar open={navOpen} />
      <Bar open={navOpen} />
    </BarWrapper>
  )
}

const Nav = () => {
  const { navOpen, setNavOpen } = useNav()
  const pathname = useRouter().pathname || Links.About

  useEffect(() => {
    setNavOpen(false)
  }, [pathname])

  let content = Object.entries(Links).map(([key, value]) => {
    const active =
      value === "/" ? pathname === value : pathname.startsWith(value)
    return (
      <Link key={value} href={value} active={active} size={1.2} variant="nav">
        {key}
      </Link>
    )
  })

  return (
    <>
      <Container>{content}</Container>
      <MobileControls />
      <AnimatePresence>
        {navOpen && (
          <MobileContainer
            initial={{ opacity: 0, y: -100 }}
            exit={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            key={pathname}
          >
            {content}
          </MobileContainer>
        )}
      </AnimatePresence>
    </>
  )
}

export default Nav
