import styled from "styled-components"

const Container = styled.div`
  padding-top: 3em;
  padding-bottom: 2em;
  justify-content: center;
`

const StyledSeparator = styled.div`
  height: 2px;
  width: 100%;
  max-width: 300px;
  background-color: ${({ theme }) => theme.secondary};
`

const Separator = () => (
  <Container>
    <StyledSeparator />
  </Container>
)

export default Separator
