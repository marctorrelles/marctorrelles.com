import * as React from 'react'
import styled from 'styled-components'

import PageContainer from '../components/organisms/PageContainer'
import Title from '../components/atoms/Title'
import Text from '../components/atoms/Text'
import Link from '../components/atoms/Link'

const ContactItems = styled.div`
  padding-left: 1.5em;
  flex-direction: column;
  > *:not(:last-child) {
    padding-bottom: 0.5em;
  }
`

const Contact = () => {
  return (
    <PageContainer>
      <Title>Let's share some thoughts! 😄</Title>
      <Text>
        I love to meet new people, having nice conversations and learn. Ping me and let's collaborate,
        have a coffee or maybe a beer!
      </Text>
      <Text>Reach me:</Text>
      <ContactItems>
        <Text>
          Through <b>Github</b> at <Link href='https://github.com/marctorrelles' target='_blank'>marctorrelles</Link>
        </Text>
        <Text>
          Dropping me an <b>Email</b> at <Link href='mailto:marctorrelles@gmail.com'>marctorrelles@gmail.com</Link>
        </Text>
        <Text>
          Connecting with me on <b>Twitter</b> at <Link href='https://twitter.com/marctorrelles'>@marctorrelles</Link>
        </Text>
      </ContactItems>
    </PageContainer>
  )
}

export default Contact
