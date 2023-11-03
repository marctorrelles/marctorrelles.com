import styled from "styled-components"
import { ThemeParams, darkTheme, lightTheme } from "../styles/theme"

const Container = styled.div`
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  width: 100%;
  justify-content: center;
`

const StyledSeparator = styled.div`
  height: 1px;
  width: 100%;
  width: 100%;
  background-color: ${lightTheme.dark};
  @media (prefers-color-scheme: dark) {
    background-color: ${darkTheme.dark};
  }
`

const Separator = () => (
  <Container>
    <StyledSeparator />
  </Container>
)

export default Separator
