import * as React from 'react'
import { useRouter } from 'next/router'

import Container from '../atoms/Container'
import Link from '../atoms/Link'
import DarkModeToggler from '../molecules/DarkModeToggler'

enum Tab {
  Home = '/',
  About = '/about',
  Blog = '/blog',
  Contact = '/contact'
}

const Nav = () => {
  const { pathname } = useRouter()
  console.log(pathname)

  return (
    <Container
      paddingTop={2}
      paddingBottom={2}
      paddingLeft={3}
      paddingRight={3}
      width='100%'
      justifyContent='space-between'
      alignItems='center'
    >
      <Container gap={2}>
        {Object.entries(Tab).map(([key, value]) => (
          <Link href={value} active={ pathname === value}>{key}</Link>
        ))}
      </Container>
      <DarkModeToggler />
    </Container>
  )
}

export default Nav
