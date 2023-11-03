import { useRouter } from "next/router"
import styled from "styled-components"

import { AnimatePresence, motion } from "framer-motion"
import {
  INNER_SEPARATION,
  ThemeParams,
  darkTheme,
  lightTheme,
} from "../styles/theme"
import Link from "./Link"
import { useEffect, useState } from "react"

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
  background-color: ${lightTheme.background};
  display: none;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    display: inherit;
  }
  @media (prefers-color-scheme: dark) {
    background-color: ${darkTheme.background};
  }
`

const BarWrapper = styled.div`
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
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    display: flex;
  }
`

const Bar = styled(motion.div)<{ open: boolean }>`
  width: 100%;
  height: 0.2em;
  background-color: ${lightTheme.primary};
  @media (prefers-color-scheme: dark) {
    background-color: ${darkTheme.primary};
  }
  transform-origin: 1.4em;
  transition: all 0.25s ease-in-out;
  &:nth-child(1) {
    transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
  }
  &:nth-child(2) {
    transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
  }
`

function MobileControls({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (value: boolean) => void
}) {
  return (
    <BarWrapper onClick={() => setOpen(!open)}>
      <Bar open={open} />
      <Bar open={open} />
    </BarWrapper>
  )
}

const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = useRouter().pathname || Links.About

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  let content = Object.entries(Links).map(([key, value]) => {
    const active =
      value === "/" ? pathname === value : pathname.startsWith(value)
    return (
      <Link
        key={value}
        href={value}
        active={active}
        size={active ? 1.9 : 1.2}
        variant="nav"
      >
        {key}
      </Link>
    )
  })

  return (
    <>
      <Container>{content}</Container>
      <MobileControls open={mobileOpen} setOpen={setMobileOpen} />
      <AnimatePresence>
        {mobileOpen && (
          <MobileContainer
            initial={{ opacity: 0, y: -100 }}
            exit={{ opacity: 0, y: -100 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.2,
            }}
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
