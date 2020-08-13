import * as React from 'react'
import styled from 'styled-components'

import PageContainer from '../components/layout/PageContainer'
import Text from '../components/atoms/Text'
import Link from '../components/atoms/Link'
import Title from '../components/atoms/Title'

const StyledTable = styled.table`
  width: 100%;
  padding: 1em;
`

const StyledTd = styled.td`
  padding-bottom: 0.5em;
`

const Contact = () => {
  return (
    <PageContainer>
      <Title>Let's have a beer! 🍻</Title>
      <Text>
        I love to meet new people, share thoughts and learn. I can also have a coffee, but hey,
        I won't probably get up before 8am 🙂 so a beer is probably gonna fit me better.
      </Text>
      <Text>You can reach me through:</Text>
      <StyledTable>
        <tr>
          <StyledTd>Github</StyledTd>
          <StyledTd><Link href='https://github.com/marctorrelles' target='_blank'>marctorrelles</Link></StyledTd>
        </tr>
        <tr>
          <StyledTd>Email</StyledTd>
          <StyledTd><Link href='mailto:marctorrelles@gmail.com'>marctorrelles@gmail.com</Link></StyledTd>
        </tr>
      </StyledTable>
    </PageContainer>
  )
}

export default Contact
