import { createGlobalStyle } from 'styled-components'
import { Theme } from './theme'

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html {
    height: 100%;
  }
  body {
    height: 100%;
    margin: 0;
    transition: background ease 0.25s;
    font-family: "Recursive Medium", Consolas, monospace, serif;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.primary};
  }
`

export default GlobalStyle
