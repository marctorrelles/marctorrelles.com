import App, { AppInitialProps } from "next/app"
import Head from "next/head"
import styled from "styled-components"

import Nav, { NAV_HEIGHT } from "../components/Nav"
import Footer from "../components/Footer"

import { ThemeProvider } from "../styles/ThemeProvider"
import loadFonts from "../styles/loadFonts"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeParams } from "../styles/theme"
import { NextComponentType, NextPageContext } from "next"
import { Router } from "next/router"

const Container = motion(styled.div`
  height: 100%;
  max-width: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding-top: ${NAV_HEIGHT.regular};
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    padding-top: ${NAV_HEIGHT.mobile};
  }
`)

const ContentContainer = motion(styled.div`
  width: 100%;
  flex-direction: column;
  align-items: center;
`)

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
