import { createGlobalStyle } from "styled-components"
import { darkTheme, lightTheme } from "./theme"
import { Font } from "./FontProvider"

function getFontStyles(font: Font) {
  switch (font) {
    case "monospace":
      return `
      font-family: "DM Mono", "monospace";
      line-height: 1.5;
      `
    case "serif":
      return `
      font-family: "Lora", "serif";
      line-height: 1.6;
      `
    case "sans":
      return `
      font-family: "Poppins", "sans-serif";
      line-height: 1.6;
      `
  }
}

const GlobalStyle = createGlobalStyle<{ $font: Font }>`
  html {
    height: 100%;
    background: white;
  }
  body {
    height: 100%;
    margin: 0;
    transition: background ease 0.25s, color ease 0.25s;
    ${(props) => getFontStyles(props.$font)}
    font-weight: 400;
    font-display: swap;
    color: ${lightTheme.primary};
  }
  @media (prefers-color-scheme: dark) {
    html {
      background: black;
    }
    body {
      color: ${darkTheme.primary};
    }
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
  * {
    scrollbar-width: thin;
    scrollbar-color: ${lightTheme.background} ${lightTheme.secondary};
    @media (prefers-color-scheme: dark) {
      scrollbar-color: ${darkTheme.background} ${darkTheme.secondary};
    }
  }

  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 10px;
  }

  *::-webkit-scrollbar-track {
    background: ${lightTheme.dark};
    @media (prefers-color-scheme: dark) {
      background: ${darkTheme.dark};
    }
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${lightTheme.background};
    border-radius: 0;
    @media (prefers-color-scheme: dark) {
      background-color: ${darkTheme.background};
    }
  }
`

export default GlobalStyle
