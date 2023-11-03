import styled from "styled-components"
import {
  INNER_SEPARATION,
  ThemeParams,
  darkTheme,
  lightTheme,
} from "../styles/theme"

const Wrapper = styled.div`
  padding: ${INNER_SEPARATION.Desktop}px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    padding: ${INNER_SEPARATION.Mobile}px;
  }
`

const NameWrapper = styled.div`
  font-size: 2.6em;
  line-height: 1em;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    font-size: 2em;
  }
`
const NameSpan = styled.span``
const SurnameSpan = styled.span`
  color: ${lightTheme.primary}50;
  @media (prefers-color-scheme: dark) {
    color: ${darkTheme.primary}50;
  }
`
const OtherWrapper = styled.div`
  font-size: 1.3em;
  color: ${lightTheme.primary}75;
  @media (prefers-color-scheme: dark) {
    color: ${darkTheme.primary}75;
  }
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    font-size: 1.1em;
  }
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
