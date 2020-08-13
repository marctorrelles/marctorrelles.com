import * as React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { useDarkMode } from '../components/logic/darkModeContext'
import { darkTheme, lightTheme } from './theme'
import GlobalStyle from './GlobalStyle'

type ThemeProviderProps = {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { darkMode } = useDarkMode()

  const theme = darkMode ? darkTheme : lightTheme

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  )
}
