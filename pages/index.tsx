import * as React from 'react'

import PageContainer from '../components/layout/PageContainer'
import Container from '../components/layout/Container'
import Title from '../components/atoms/Title'
import Text from '../components/atoms/Text'
import Link from '../components/atoms/Link'
import { Links } from '../components/organisms/Nav'

const Home = () => (
  <PageContainer>
    <Title>Hey there, I'm Marc! 👋</Title>
    <Container flexDirection='column' gap={0.6}>
      <Text>
        I'm a software engineer based in Barcelona,
        currently working at <Link href='https://factorialhr.com' target='_blank'>Factorial HR</Link>
      </Text>
      <Text>
        I've recently started to write stuff at my <Link href={Links.Blog}>blog</Link>,
        not only technical but whatever that comes my way. Check it out 🚆
      </Text>
      <Text>
        You can read more about me <Link href={Links.About}>here</Link>
      </Text>
    </Container>
  </PageContainer>
)

export default Home
