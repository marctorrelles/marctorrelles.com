import * as React from 'react'
import styled from 'styled-components'

import PageContainer from '../components/layout/PageContainer'
import Title from '../components/atoms/Title'
import Text from '../components/atoms/Text'
import Separator from '../components/layout/Separator'
import Link from '../components/atoms/Link'
import Container from '../components/layout/Container'

const About = () => (
  <PageContainer>
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
  </PageContainer>
)


export default About
