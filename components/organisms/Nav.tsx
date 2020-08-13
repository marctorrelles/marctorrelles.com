import * as React from 'react'
import { useRouter } from 'next/router'

import Container from '../layout/Container'
import Link from '../atoms/Link'
import DarkModeToggler from '../molecules/DarkModeToggler'

export enum Links {
  Home = '/',
  Blog = '/blog',
  About = '/about',
  Contact = '/contact'
}

const Nav = () => {
  const pathname = useRouter().pathname || Links.Home

  return (
    <Container
      paddingTop={2}
      paddingBottom={2}
      paddingLeft={3}
      paddingRight={3}
      gap={2}
      width='100%'
      justifyContent='space-between'
      alignItems='center'
    >
      <Container gap={2}>
        {Object.entries(Links).map(([key, value]) => {
          const isActive = pathname === value
          return (
            <Link
              key={value}
              href={value}
              active={pathname === value}
              size={1.2}
            >
              {key}
            </Link>
          )
        })}
      </Container>
      <DarkModeToggler />
    </Container>
  )
}

export default Nav
