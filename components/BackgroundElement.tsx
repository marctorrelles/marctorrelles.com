import styled from "styled-components"
import { darkTheme, lightTheme } from "../styles/theme"

const BackgroundElement = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  background-color: ${lightTheme.background};
  @media (prefers-color-scheme: dark) {
    background-color: ${darkTheme.background};
  }
`

export default BackgroundElement
