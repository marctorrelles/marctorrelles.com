import { createGlobalStyle } from 'styled-components'
import { Theme } from './theme'

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  body {
    margin: 0;
    transition: background ease 0.25s;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.primary};
  }
`

export default GlobalStyle
