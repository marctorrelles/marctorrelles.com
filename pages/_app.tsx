import { AnimatePresence, motion } from "framer-motion"
import App from "next/app"
import Head from "next/head"
import { Router } from "next/router"
import styled from "styled-components"
import Footer from "../components/Footer"
import Nav from "../components/Nav"
import { ThemeProvider } from "../styles/ThemeProvider"
import loadFonts from "../styles/loadFonts"
import { MAIN_SEPARATION, darkTheme, lightTheme } from "../styles/theme"
import Name from "../components/Name"

const Container = motion(styled.div`
  position: absolute;
  height: calc(100% - ${MAIN_SEPARATION * 2}px);
  width: calc(100% - ${MAIN_SEPARATION * 2}px);
  min-height: 500px;
  margin: ${MAIN_SEPARATION}px;
  border: 1px solid #717171;
  flex-direction: column;
  background: ${lightTheme.background};
  @media (prefers-color-scheme: dark) {
    background: ${darkTheme.background};
  }
`)

const ContentContainer = motion(styled.div`
  width: 100%;
  min-height: 100%;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
`)

export default class MyApp extends App {
  state = {
    fontsLoaded: true,
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
        </Head>
        <ThemeProvider>
          <Container
            animate={this.state.fontsLoaded ? "loaded" : "loading"}
            variants={{
              loaded: {
                opacity: 1,
              },
              loading: {
                opacity: 0,
              },
            }}
            initial="loading"
          >
            <ContentContainer>
              <Name />
              <Nav />
              <AnimatePresence mode="sync" initial={false}>
                <ContentContainer
                  initial={{ opacity: 0, position: "relative" }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, position: "absolute" }}
                  key={router.pathname}
                >
                  <Component {...pageProps} />
                </ContentContainer>
              </AnimatePresence>
            </ContentContainer>
            <Footer />
          </Container>
        </ThemeProvider>
      </>
    )
  }
}
