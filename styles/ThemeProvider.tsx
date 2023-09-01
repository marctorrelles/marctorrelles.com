import * as React from "react"
import GlobalStyle from "./GlobalStyle"

type ThemeProviderProps = {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  )
}
