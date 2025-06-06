import { AnimatePresence, motion } from "framer-motion"
import App from "next/app"
import dynamic from "next/dynamic"
import Head from "next/head"
import { Router } from "next/router"
import styled from "styled-components"
import Name from "../components/Name"
import Nav from "../components/Nav"
import NavMobile from "../components/NavMobile"
import RightSidebar from "../components/RightSidebar"
import { FontConsumer, FontProvider, TIMEOUT } from "../styles/FontProvider"
import { NavProvider } from "../styles/NavProvider"
import { ThemeProvider } from "../styles/ThemeProvider"
import loadFonts from "../styles/loadFonts"
import {
  MAIN_SEPARATION,
  ThemeParams,
  darkTheme,
  lightTheme,
} from "../styles/theme"

const LeftSidebar = dynamic(() => import("../components/LeftSidebar"), {
  ssr: false,
})

const Container = motion(styled.div`
  position: absolute;
  height: calc(100% - ${MAIN_SEPARATION * 2}px);
  width: calc(100% - ${MAIN_SEPARATION * 2}px);
  min-height: 280px;
  min-width: 290px;
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

const ContentContainer = motion(styled.div`
  width: 100%;
  min-height: 100%;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
  top: 0;
  bottom: 0;
`)

const PageContent = ({
  Component,
  pageProps,
  router,
  font,
  shouldHideName,
}) => {
  const pageTransition = {
    initial: { opacity: 0, position: "relative" as const },
    animate: { opacity: 1 },
    exit: { opacity: 0, position: "absolute" as const },
  }

  const fontTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      stiffness: 1000,
      damping: 100,
      duration: TIMEOUT / 1000,
    },
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <ContentContainer
        key={font}
        {...fontTransition}
        style={{ overflow: "hidden" }}
      >
        <AnimatePresence mode="sync" initial={false}>
          <ContentContainer key={router.pathname} {...pageTransition}>
            <Component {...pageProps} />
          </ContentContainer>
        </AnimatePresence>
        <AnimatePresence mode="sync" initial={false}>
          {!shouldHideName && (
            <motion.div
              key="name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Name />
            </motion.div>
          )}
        </AnimatePresence>
        <Nav />
      </ContentContainer>
    </AnimatePresence>
  )
}

export default class MyApp extends App {
  state = {
    fontsLoaded: false,
  }

  async componentDidMount() {
    await loadFonts()
    this.setState({ fontsLoaded: true })
  }

  // Missing some props, ignoring for simplicity
  componentDidUpdate(prevProps: Readonly<{ router: Router }>) {
    prevProps.router.events.on("routeChangeComplete", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  render() {
    const { Component, pageProps, router } = this.props
    const shouldHideName = router.pathname === "/experience"

    return (
      <>
        <Head>
          <title>marctorrelles</title>
          <meta name="description" content="Marc Torrelles personal website" />
          <meta property="og:title" content="marctorrelles" key="ogtitle" />
          <meta
            property="og:description"
            content="Marc Torrelles personal website"
            key="ogdesc"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="/marctorrelles.png"
            key="ogimage"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
        </Head>
        <FontProvider>
          <ThemeProvider>
            <NavProvider>
              <FontConsumer>
                {({ font }) => (
                  <AnimatePresence mode="wait" initial={false}>
                    <Container
                      animate={this.state.fontsLoaded ? "loaded" : "loading"}
                      variants={{
                        loaded: { opacity: 1 },
                        loading: { opacity: 0 },
                      }}
                      initial="loading"
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      key="main-container"
                    >
                      <PageContent
                        Component={Component}
                        pageProps={pageProps}
                        router={router}
                        font={font}
                        shouldHideName={shouldHideName}
                      />
                      <RightSidebar />
                      <LeftSidebar />
                      <NavMobile />
                    </Container>
                  </AnimatePresence>
                )}
              </FontConsumer>
            </NavProvider>
          </ThemeProvider>
        </FontProvider>
      </>
    )
  }
}
