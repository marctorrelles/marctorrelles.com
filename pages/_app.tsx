import * as React from 'react';
import App from 'next/app';

import { DarkMode } from '../components/logic/darkModeContext';
import { ThemeProvider } from '../styles/ThemeProvider';
import Nav from '../components/organisms/Nav';

export default class MyApp extends App {
	render() {
    const { Component, pageProps } = this.props

		return (
      <DarkMode>
        <ThemeProvider>
          <Nav />
          <Component {...pageProps} />
        </ThemeProvider>
      </DarkMode>
		)
	}
}
