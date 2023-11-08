import * as React from "react"
import styled from "styled-components"

import { INNER_SEPARATION, ThemeParams } from "../styles/theme"
import { useNav } from "../styles/NavProvider"

type Props = {
  children: React.ReactNode
}

const Container = styled.div<{ $navOpen?: boolean }>`
  width: 100%;
  height: 100%;
  max-width: 1000px;
  margin-top: 180px;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    transition: opacity 0.25s ease-in-out, transform 0.2s ease-in-out;
    margin-top: 140px;
    width: 100%;
    opacity: ${({ $navOpen }) => ($navOpen ? 0 : 1)};
    transform: translateY(${({ $navOpen }) => ($navOpen ? "-20px" : "0")});
  }
`

const Element = styled.div`
  flex-direction: column;
  padding-left: ${INNER_SEPARATION.Desktop}px;
  padding-right: 200px;
  padding-bottom: ${INNER_SEPARATION.Desktop}px;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    padding-left: ${INNER_SEPARATION.Mobile}px;
    padding-right: ${INNER_SEPARATION.Mobile}px;
    padding-bottom: ${INNER_SEPARATION.Mobile}px;
  }
`

const PageContainer = ({ children }: Props) => {
  const { navOpen } = useNav()

  return (
    <Container $navOpen={navOpen}>
      <div />
      <Element>{children}</Element>
    </Container>
  )
}

export default PageContainer
