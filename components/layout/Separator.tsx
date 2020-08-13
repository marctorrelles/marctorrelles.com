import styled from 'styled-components'
import Container from './Container'

const StyledSeparator = styled.div`
  height: 2px;
  width: 100%;
  max-width: 300px;
  background-color: ${({ theme }) => theme.secondary};
`

const Separator = () => (
  <Container paddingTop={3} paddingBottom={2} justifyContent='center'>
    <StyledSeparator />
  </Container>
)

export default Separator
