import * as React from 'react'
import styled from 'styled-components'

import { ThemeParams } from '../../styles/theme'

type Props = {
  children: React.ReactNode
}

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 3em;
  padding-top: 2.5em;
  padding-bottom: 2.5em;
  flex-direction: column;
  justify-content: center;
  > *:not(:last-child) {
    padding-bottom: 1em;
  }
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    padding: 1.5em;
    padding-top: 1em;
    padding-bottom: 1em;
    > *:not(:last-child) {
      padding-bottom: 1em;
    }
  }
`

const PageContainer = ({ children }: Props) => (
  <Container>
    {children}
  </Container>
)

export default PageContainer
