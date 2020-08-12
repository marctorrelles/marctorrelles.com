import * as React from 'react'
import styled from 'styled-components'

import { useDarkMode } from '../logic/darkModeContext'
import Container from '../components/atoms/Container'
import Toggler from '../components/molecules/DarkModeToggler'

const Title = styled.h1`
	font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
`

const Home = () => {
  return (
    <Container
      padding={2}
      paddingTop={5}
      justifyContent='center'
      alignItems='center'
    >
      <Title>Hello world!</Title>
    </Container>
  )
}

export default Home
