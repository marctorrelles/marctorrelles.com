import { createGlobalStyle } from 'styled-components'
import { Theme } from './theme'

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  body {
    font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
    margin: 0;
    transition: background ease 0.25s;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.primary};
  }
`

export default GlobalStyle
