import App from "next/app"
import Head from "next/head"
import styled from "styled-components"
import { useRouter } from "next/router"

import Nav from "../components/Nav"
import Footer from "../components/Footer"

import { ThemeProvider } from "../styles/ThemeProvider"
import loadFonts from "../styles/loadFonts"
import { AnimatePresence, motion } from "framer-motion"

const Container = motion(styled.div`
  height: 100%;
  max-width: 100%;
  flex-direction: column;
  justify-content: space-between;
`)

const ContentContainer = motion(styled.div`
  width: 100%;
  flex-direction: column;
  align-items: center;
`)

export default class MyApp extends App {
  componentDidMount() {
    loadFonts()
  }

  render() {
    const { Component, pageProps, router } = this.props

    return (
      <>
        <Head>
          <title>marctorrelles</title>
        </Head>
        <ThemeProvider>
          <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ContentContainer>
              <Nav />
              <AnimatePresence mode="wait" initial={false}>
                <ContentContainer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
