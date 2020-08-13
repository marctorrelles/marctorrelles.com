import * as React from 'react'
import styled from 'styled-components'

import { useMobile } from '../../logic/mobileContext'
import Container from './Container'

type Props = {
  children: React.ReactNode
}

const StyledContainer = styled(Container)`
  max-width: 800px;
`

const PageContainer = ({ children }: Props) => {
  const isMobile = useMobile()

  return (
    <Container justifyContent='center'>
      <StyledContainer
        padding={isMobile ? 1.5 : 3}
        paddingTop={isMobile ? 1 : 2.5}
        paddingBottom={2.5}
        gap={1}
        flexDirection='column'
        justifyContent='center'
        width='100%'
      >
        {children}
      </StyledContainer>
    </Container>
  )
}

export default PageContainer
