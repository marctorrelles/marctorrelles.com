import styled from "styled-components"
import { INNER_SEPARATION, darkTheme, lightTheme } from "../styles/theme"

const Wrapper = styled.div`
  padding: ${INNER_SEPARATION}px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`

const NameWrapper = styled.div`
  font-size: 2.8em;
  line-height: 1em;
`
const NameSpan = styled.span``
const SurnameSpan = styled.span`
  color: ${lightTheme.secondary};
  @media (prefers-color-scheme: dark) {
    color: ${darkTheme.secondary};
  }
`
const OtherWrapper = styled.div`
  font-size: 1.6em;
`

function Name() {
  return (
    <Wrapper>
      <NameWrapper>
        <NameSpan>marc</NameSpan>
        <SurnameSpan>torrelles</SurnameSpan>
      </NameWrapper>
      <OtherWrapper>software developer</OtherWrapper>
    </Wrapper>
  )
}

export default Name
