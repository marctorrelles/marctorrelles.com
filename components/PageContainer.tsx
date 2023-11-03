import * as React from "react"
import styled from "styled-components"

import { INNER_SEPARATION, ThemeParams } from "../styles/theme"

type Props = {
  children: React.ReactNode
}

const Container = styled.div<{ noGap?: boolean }>`
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
    margin-top: 140px;
    margin-bottom: ${INNER_SEPARATION.Mobile}px;
    padding-left: ${INNER_SEPARATION.Mobile}px;
    padding-right: ${INNER_SEPARATION.Mobile}px;
  }
`

const Element = styled.div`
  flex-direction: column;
`

const PageContainer = ({ children }: Props) => (
  <Container>
    <div />
    <Element>{children}</Element>
  </Container>
)

export default PageContainer
