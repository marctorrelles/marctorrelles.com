import * as React from 'react'

import PageContainer from '../components/layout/PageContainer'
import Container from '../components/layout/Container'
import Title from '../components/atoms/Title'
import Text from '../components/atoms/Text'
import Link from '../components/atoms/Link'

const Contact = () => {
  return (
    <PageContainer>
      <Title>Let's share some thoughts! 😄</Title>
      <Text>
        I love to meet new people, having nice conversations and learn. Ping me and let's collaborate 🛠,
        have a coffee ☕️ or maybe a beer! 🍻
      </Text>
      <Text>Reach me:</Text>
      <Container flexDirection='column' paddingLeft={2} gap={1}>
        <Text>
          Through <b>Github</b> at <Link href='https://github.com/marctorrelles' target='_blank'>marctorrelles</Link>
        </Text>
        <Text>
          Dropping me an <b>Email</b> at <Link href='mailto:marctorrelles@gmail.com'>marctorrelles@gmail.com</Link>
        </Text>
        <Text>
          Connecting with me on <b>Twitter</b> at <Link href='https://twitter.com/marctorrelles'>@marctorrelles</Link>
        </Text>
      </Container>
    </PageContainer>
  )
}

export default Contact
