import App from 'next/app';
import React from 'react';

import { DarkMode } from '../logic/darkModeContext';
import { ThemeProvider } from '../styles/ThemeProvider';
import DarkModeToggler from '../components/molecules/DarkModeToggler';

export default class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
      <DarkMode>
        <ThemeProvider>
          <Component {...pageProps} />
          <DarkModeToggler />
        </ThemeProvider>
      </DarkMode>
		);
	}
}
