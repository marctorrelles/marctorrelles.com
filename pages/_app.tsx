import * as React from 'react'
import App from 'next/app'
import styled from 'styled-components'

import Nav from '../components/organisms/Nav';
import Footer from '../components/organisms/Footer';

import { DarkModeProvider } from '../logic/darkModeContext';
import { ThemeProvider } from '../styles/ThemeProvider';
import loadFonts from '../styles/loadFonts';

const Container = styled.div`
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`

const ContentContainer = styled.div`
  width: 100%;
  flex-direction: column;
  align-items: center;
`

export default class MyApp extends App {
  componentDidMount () {
    loadFonts()
  }

  render() {
    const { Component, pageProps } = this.props

		return (
      <DarkModeProvider>
        <ThemeProvider>
          <Container>
            <ContentContainer>
              <Nav />
              <Component {...pageProps} />
            </ContentContainer>
            <Footer />
          </Container>
        </ThemeProvider>
      </DarkModeProvider>
		)
	}
}
