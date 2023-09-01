import { createGlobalStyle } from "styled-components"
import { Theme } from "./theme"

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html {
    height: 100%;
  }
  body {
    height: 100%;
    margin: 0;
    transition: background ease 0.25s, color ease 0.25s;
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400;
    font-display: swap;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.primary};
    line-height: 1.6;
  }
  div {
    box-sizing: border-box;
    display: flex;
  }
  p {
    margin-block-start: 0;
    margin-block-end: 0.6em;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }
  h1, h2, h3, h4, h5 {
    margin-block-start: 0.8em;
    margin-block-end: 0.4em;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }
  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.6em;
  }
  h3 {
    font-size: 1.2em;
  }
  h4 {
    font-size: 1.1em;
  }
  h5 {
    font-size: 1em;
  }
  img {
    width: 100%;
    height: auto;
  }
`

export default GlobalStyle
