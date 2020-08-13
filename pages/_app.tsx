import App from 'next/app';
import React from 'react';

import { DarkMode } from '../logic/darkModeContext';
import { ThemeProvider } from '../styles/ThemeProvider';
import Nav from '../components/organisms/Nav';

export default class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
      <DarkMode>
        <ThemeProvider>
          <Nav />
          <Component {...pageProps} />
        </ThemeProvider>
      </DarkMode>
		);
	}
}
