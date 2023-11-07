import styled from "styled-components"
import { ThemeParams } from "../styles/theme"

type Kind = "primary" | "secondary"
type Variant = "sidebar" | "regular"

type Props = {
  kind?: Kind
  variant?: Variant
}

const Text = styled.p<Props>`
  padding: 0;
  margin: 0;
  margin-top: 0.6em;
  font-size: ${({ variant }) =>
    variant === "regular" || !variant ? 1 : 0.9}rem;
  line-height: 1.5em;
  font-weight: 300;
  opacity: ${(props) => (props.kind === "secondary" ? 0.5 : 1)};
  text-transform: ${({ variant }) =>
    variant === "sidebar" ? "uppercase" : "inherit"};
  font-family: ${({ variant }) =>
    variant === "sidebar" ? "monospace" : "inherit"};
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    font-size: ${({ variant }) =>
      variant === "regular" || !variant ? 1 : 0.9}em;
  }
`

export default Text
