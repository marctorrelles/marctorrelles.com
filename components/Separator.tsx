import styled from "styled-components"
import { darkTheme, lightTheme } from "../styles/theme"

type Kind = "regular" | "full"

type Props = {
  kind?: Kind
}

const Container = styled.div`
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  width: 100%;
  justify-content: center;
`

const StyledSeparator = styled.div<Props>`
  height: 2px;
  width: 100%;
  max-width: ${({ kind }) => (kind === "full" ? "100%" : "300px")};
  background-color: ${lightTheme.secondary};
  @media (prefers-color-scheme: dark) {
    background-color: ${darkTheme.secondary};
  }
`

const Separator = ({ kind = "regular" }: Props) => (
  <Container>
    <StyledSeparator kind={kind} />
  </Container>
)

export default Separator
