import * as React from "react"
import GlobalStyle from "./GlobalStyle"
import { useFont } from "./FontProvider"

type ThemeProviderProps = {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { displayFont } = useFont()

  return (
    <>
      <GlobalStyle $font={displayFont} />
      {children}
    </>
  )
}
