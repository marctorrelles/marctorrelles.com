import * as React from 'react'
import styled from 'styled-components'

import PageContainer from '../components/layout/PageContainer'
import Title from '../components/atoms/Title'
import Text from '../components/atoms/Text'
import Separator from '../components/layout/Separator'
import Link from '../components/atoms/Link'
import Container from '../components/layout/Container'

const StyledTable = styled.table`
  width: 100%;
  padding: 1em;
`

const StyledTd = styled.td`
  padding-bottom: 0.5em;
`

const About = () => (
  <PageContainer>
    {/* About */}
    <Title>About me 👨‍💻</Title>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed augue tempor,
      suscipit eros id, mattis neque. Phasellus ac commodo arcu, et venenatis tellus.
      Aenean mattis imperdiet enim, vel gravida sapien pharetra id. Ut neque ex, elementum
      eget fringilla sed, semper vitae odio. Nulla sagittis iaculis urna quis blandit.
      Proin auctor sagittis viverra.
    </Text>
    <Text>
      Duis elementum nunc ex, nec venenatis felis rhoncus
      vitae. Sed id volutpat purus, a venenatis massa. Vestibulum ante ipsum primis in
      faucibus orci luctus et ultrices posuere cubilia curae; Etiam aliquam bibendum
      auctor. Integer dapibus urna non sem commodo, sed feugiat leo ullamcorper. Ut at
      metus quis mauris lobortis pulvinar.
    </Text>
    <Text>
      Maecenas tincidunt purus vel suscipit ullamcorper. Nulla sed ex dui. Sed pretium,
      velit commodo maximus gravida, sapien turpis ornare purus, vitae scelerisque enim
      neque a libero. Proin tortor ligula, vestibulum a ipsum eu, maximus ullamcorper metus.
    </Text>
    <Separator />
    {/* Contact */}
    <Title>Let's have a beer! 🍻</Title>
      <Text>
        I love to meet new people, share thoughts and learn. Let's get in tough and have a beer 😄
        (I can also have a coffee but... well, a beer is probably gonna fit me better).
      </Text>
      <Text>You can reach me through:</Text>
      <Container flexDirection='column' paddingLeft={2}>
        <Text>
          Github at <Link href='https://github.com/marctorrelles' target='_blank'>marctorrelles</Link>
        </Text>
        <Text>
          Email at <Link href='mailto:marctorrelles@gmail.com'>marctorrelles@gmail.com</Link>
        </Text>
      </Container>
  </PageContainer>
)


export default About
