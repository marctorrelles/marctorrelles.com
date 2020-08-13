import * as React from 'react'

import Container from '../components/atoms/Container'
import Title from '../components/atoms/Title'
import Text from '../components/atoms/Text'

const Blog = () => {
  return (
    <Container
      gap={1}
      padding={2}
      paddingTop={5}
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Title>Hello world!</Title>
      <Text>Le blog</Text>
    </Container>
  )
}

export default Blog
