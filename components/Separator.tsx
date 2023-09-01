import styled from "styled-components"
import { darkTheme, lightTheme } from "../styles/theme"

const Container = styled.div`
  padding-top: 3em;
  padding-bottom: 2em;
  width: 100%;
  justify-content: center;
`

const StyledSeparator = styled.div`
  height: 2px;
  width: 100%;
  max-width: 300px;
  background-color: ${lightTheme.secondary};
  @media (prefers-color-scheme: dark) {
    background-color: ${darkTheme.secondary};
  }
`

const Separator = () => (
  <Container>
    <StyledSeparator />
  </Container>
)

export default Separator
