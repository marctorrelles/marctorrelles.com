import styled from "styled-components"

type Kind = "primary" | "secondary"
type Variant = "sidebar" | "regular"

type Props = {
  kind?: Kind
  variant?: Variant
}

const Text = styled.p<Props>`
  padding: 0;
  margin: 0;
  margin-bottom: 0.6em;
  font-size: ${({ variant }) =>
    variant === "regular" || !variant ? 1.15 : 0.9}em;
  line-height: 1.5em;
  font-weight: 300;
  opacity: ${(props) => (props.kind === "secondary" ? 0.5 : 1)};
  text-transform: ${({ variant }) =>
    variant === "sidebar" ? "uppercase" : "inherit"};
  font-family: ${({ variant }) =>
    variant === "sidebar" ? "monospace" : "inherit"};
`

export default Text
