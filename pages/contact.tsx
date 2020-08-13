import * as React from 'react'

import PageContainer from '../components/layout/PageContainer'
import Container from '../components/layout/Container'
import Title from '../components/atoms/Title'
import Text from '../components/atoms/Text'
import Link from '../components/atoms/Link'

const Contact = () => {
  return (
    <PageContainer>
      <Title>Let's have a beer! 🍻</Title>
      <Text>
        I love to meet new people, share thoughts and learn. Let's get in tough and have a beer 😄
        (I can also have a coffee but... well, a beer is probably gonna fit me better).
      </Text>
      <Text>You can reach me through:</Text>
      <Container flexDirection='column' paddingLeft={2} gap={1}>
        <Text>
          <b>Github</b> at <Link href='https://github.com/marctorrelles' target='_blank'>marctorrelles</Link>
        </Text>
        <Text>
          Dropping me an email at <Link href='mailto:marctorrelles@gmail.com'>marctorrelles@gmail.com</Link>
        </Text>
        <Text>
          Connecting with me on twitter at <Link href='https://twitter.com/marctorrelles'>@marctorrelles</Link> (even
          I don't tweet as much as I would like)
        </Text>
      </Container>
    </PageContainer>
  )
}

export default Contact
