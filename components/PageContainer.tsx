import * as React from "react"
import styled from "styled-components"

import { INNER_SEPARATION, ThemeParams } from "../styles/theme"
import { useNav } from "../styles/NavProvider"

type Props = {
  children: React.ReactNode
}

const Container = styled.div<{ navOpen?: boolean }>`
  width: 100%;
  height: 100%;
  max-width: 1000px;
  min-width: 300px;
  margin-top: 180px;
  margin-bottom: ${INNER_SEPARATION.Desktop}px;
  padding-left: ${INNER_SEPARATION.Desktop}px;
  padding-right: 200px;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    transition: 0.3s ease-in-out;
    margin-top: 140px;
    margin-bottom: ${INNER_SEPARATION.Mobile}px;
    padding-left: ${INNER_SEPARATION.Mobile}px;
    padding-right: ${INNER_SEPARATION.Mobile}px;
    width: 100%;
    opacity: ${({ navOpen }) => (navOpen ? 0 : 1)};
  }
`

const Element = styled.div`
  flex-direction: column;
`

const PageContainer = ({ children }: Props) => {
  const { navOpen } = useNav()

  return (
    <Container navOpen={navOpen}>
      <div />
      <Element>{children}</Element>
    </Container>
  )
}

export default PageContainer
