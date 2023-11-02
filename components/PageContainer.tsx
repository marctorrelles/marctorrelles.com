import * as React from "react"
import styled from "styled-components"

import { INNER_SEPARATION } from "../styles/theme"

type Props = {
  children: React.ReactNode
}

const Container = styled.div<{ noGap?: boolean }>`
  width: 100%;
  height: 100%;
  max-width: 1000px;
  padding: ${INNER_SEPARATION}px;
  padding-top: 200px;
  padding-right: 300px;
  flex-direction: column;
`

const PageContainer = ({ children }: Props) => <Container>{children}</Container>

export default PageContainer
