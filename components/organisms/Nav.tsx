import * as React from 'react'
import { useRouter } from 'next/router'

import { useMobile } from '../../logic/mobileContext'
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
  const isMobile = useMobile()

  return (
    <Container
      padding={isMobile ? 1.5 : 3}
      paddingTop={2}
      paddingBottom={2}
      gap={2}
      width='100%'
      justifyContent='space-between'
      alignItems={isMobile ? 'flex-start' : 'center'}
    >
      <Container
        gap={isMobile ? 0.5 : 2}
        flexDirection={isMobile ? 'column' : 'row'}
      >
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
