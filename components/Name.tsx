import NextLink from "next/link"
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
  z-index: 4;
  cursor: pointer;
  @media (prefers-color-scheme: dark) {
    mix-blend-mode: difference;
  }
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    padding: ${INNER_SEPARATION.Mobile}px;
  }
`

const NameWrapper = styled.div`
  font-size: 2.6em;
  line-height: 1em;
  font-weight: 500;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    font-size: 2em;
  }
`
const NameSpan = styled.span``
const SurnameSpan = styled.span`
  color: ${lightTheme.secondary};
  @media (prefers-color-scheme: dark) {
    color: ${darkTheme.secondary};
  }
`
const OtherWrapper = styled.div`
  font-size: 1.3em;
  color: ${lightTheme.secondary};
  @media (prefers-color-scheme: dark) {
    color: ${darkTheme.secondary};
  }
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    font-size: 1.1em;
  }
`

function Name() {
  return (
    <NextLink href="/" passHref>
      <Wrapper>
        <NameWrapper>
          <NameSpan>marc</NameSpan>
          <SurnameSpan>torrelles</SurnameSpan>
        </NameWrapper>
        <OtherWrapper>software developer</OtherWrapper>
      </Wrapper>
    </NextLink>
  )
}

export default Name
