import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { useEffect } from "react"
import styled from "styled-components"
import { Font, useFont } from "../styles/FontProvider"
import { useNav } from "../styles/NavProvider"
import {
  INNER_SEPARATION,
  ThemeParams,
  darkTheme,
  lightTheme,
} from "../styles/theme"

const BarWrapper = styled.button<{ open: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  height: 1.4em;
  width: 1.6em;
  cursor: pointer;
  z-index: 3;
  position: absolute;
  top: ${INNER_SEPARATION.Mobile + 8}px;
  right: ${INNER_SEPARATION.Mobile}px;
  transform: ${({ open }) => (open ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform 0.25s ease-in-out;
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  &:focus-visible {
    outline: 1px solid ${lightTheme.primary};
    outline-offset: 4px;
    @media (prefers-color-scheme: dark) {
      outline: 1px solid ${darkTheme.primary};
    }
  }
  @media (prefers-color-scheme: dark) {
    mix-blend-mode: difference;
  }
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    display: flex;
  }
`

const serifStyle = "&:nth-child(1) { width: 75%; }"
const sansStyle = "&:nth-child(2) { width: 75%; }"
const monospaceStyle = "&:nth-child(3) { width: 75%; }"

const Bar = styled(motion.div)<{
  open: boolean
  $font: Font
  $displayFont: Font
}>`
  width: 100%;
  height: 2px;
  background-color: ${lightTheme.primary};
  transform-origin: 1.4em;
  transition: width 0.25s ease-in-out;
  ${({ $font }) => $font === "serif" && serifStyle}
  ${({ $font }) => $font === "sans" && sansStyle}
  ${({ $font }) => $font === "monospace" && monospaceStyle}
  ${({ open, $font, $displayFont }) =>
    (open || $font !== $displayFont) && "width: 100% !important;"}

  @media (prefers-color-scheme: dark) {
    background-color: ${darkTheme.primary};
  }
`

const NavMobile = () => {
  const { navOpen, setNavOpen } = useNav()
  const pathname = useRouter().pathname
  const { font, displayFont } = useFont()

  useEffect(() => {
    setNavOpen(false)
  }, [pathname, font])

  return (
    <BarWrapper
      open={navOpen}
      onClick={() => setNavOpen(!navOpen)}
      role="button"
      tabIndex={0}
    >
      <Bar open={navOpen} $font={font} $displayFont={displayFont} />
      <Bar open={navOpen} $font={font} $displayFont={displayFont} />
      <Bar open={navOpen} $font={font} $displayFont={displayFont} />
    </BarWrapper>
  )
}

export default NavMobile
