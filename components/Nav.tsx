import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router"
import { useEffect } from "react"
import styled from "styled-components"
import { useFont } from "../styles/FontProvider"
import { useNav } from "../styles/NavProvider"
import { INNER_SEPARATION, ThemeParams } from "../styles/theme"
import Link from "./Link"

export const NAV_HEIGHT = {
  regular: "4.8em",
  mobile: "4em",
}

export enum Links {
  About = "/",
  Posts = "/posts",
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
  @media (prefers-color-scheme: dark) {
    mix-blend-mode: difference;
  }
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

const Nav = () => {
  const { navOpen, setNavOpen } = useNav()
  const pathname = useRouter().pathname || Links.About
  const { font } = useFont()

  useEffect(() => {
    setNavOpen(false)
  }, [pathname, font])

  let content = Object.entries(Links).map(([key, value]) => {
    const active =
      value === "/" ? pathname === value : pathname.startsWith(value)
    return (
      <Link key={value} href={value} active={active} size={1.3} variant="nav">
        {key}
      </Link>
    )
  })

  return (
    <>
      <Container>{content}</Container>
      <AnimatePresence>
        {navOpen && (
          <MobileContainer
            initial={{ opacity: 0, y: -20 }}
            exit={{ opacity: 0, y: -20 }}
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
