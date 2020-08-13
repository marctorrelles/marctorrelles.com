import * as React from 'react'
import styled from 'styled-components'

import Container from './Container'

type Props = {
  children: React.ReactNode
}

const StyledContainer = styled(Container)`
  max-width: 800px;
`

const PageContainer = ({ children }: Props) => (
  <Container justifyContent='center'>
    <StyledContainer
      padding={3}
      gap={1}
      flexDirection='column'
      justifyContent='center'
      width='100%'
    >
      {children}
    </StyledContainer>
  </Container>
)

export default PageContainer
