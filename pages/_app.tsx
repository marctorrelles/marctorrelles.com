import * as React from 'react';
import App from 'next/app';

import Container from '../components/layout/Container';
import Nav from '../components/organisms/Nav';
import Footer from '../components/organisms/Footer';

import { DarkMode } from '../components/logic/darkModeContext';
import { ThemeProvider } from '../styles/ThemeProvider';

export default class MyApp extends App {
	render() {
    const { Component, pageProps } = this.props

		return (
      <DarkMode>
        <ThemeProvider>
          <Container height='100%' flexDirection='column' justifyContent='space-between'>
            <Container width='100%' flexDirection='column'>
              <Nav />
              <Component {...pageProps} />
            </Container>
            <Footer />
          </Container>
        </ThemeProvider>
      </DarkMode>
		)
	}
}
