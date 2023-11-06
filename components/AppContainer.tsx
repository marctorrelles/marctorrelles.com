import { motion } from "framer-motion"
import { styled } from "styled-components"
import {
  MAIN_SEPARATION,
  ThemeParams,
  darkTheme,
  lightTheme,
} from "../styles/theme"
import { PropsWithChildren, useEffect } from "react"
import loadFonts from "../styles/loadFonts"
import { useLoading } from "../styles/LoadingProvider"

const Container = motion(styled.div`
  position: absolute;
  height: calc(100% - ${MAIN_SEPARATION * 2}px);
  width: calc(100% - ${MAIN_SEPARATION * 2}px);
  min-height: 280px;
  min-width: 320px;
  margin: ${MAIN_SEPARATION}px;
  border: 1px solid #717171;
  flex-direction: column;
  background: ${lightTheme.background};
  @media (prefers-color-scheme: dark) {
    background: ${darkTheme.background};
  }
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    width: calc(100% - ${MAIN_SEPARATION}px);
    margin-left: ${MAIN_SEPARATION / 2}px;
    margin-right: ${MAIN_SEPARATION / 2}px;
  }
`)

export default function AppContainer({ children }: PropsWithChildren) {
  const { loading, setFontsLoaded } = useLoading()

  useEffect(() => {
    ;(async () => {
      await loadFonts()
      setFontsLoaded(true)
    })()
  }, [])

  return (
    <Container
      animate={loading ? "loading" : "loaded"}
      variants={{
        loaded: { opacity: 1 },
        loading: { opacity: 0 },
      }}
      initial="loading"
    >
      {children}
    </Container>
  )
}
