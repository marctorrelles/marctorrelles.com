import styled from "styled-components"

type Kind = "primary" | "secondary"

type Props = {
  kind?: Kind
}

const Text = styled.p<Props>`
  padding: 0;
  margin: 0;
  margin-bottom: 0.6em;
  font-size: 1.15em;
  line-height: 1.5em;
  font-weight: 300;
  opacity: ${(props) => (props.kind === "secondary" ? 0.5 : 1)};
`

export default Text
