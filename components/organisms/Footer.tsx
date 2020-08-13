import * as React from 'react'

import Container from '../layout/Container'
import Link from '../atoms/Link'

import GithubIcon from '../../assets/images/github.svg'
import TwitterIcon from '../../assets/images/twitter.svg'
import EmailIcon from '../../assets/images/email.svg'

const getIcon = (icon: string) => {
  switch(icon) {
    case 'github':
      return <GithubIcon />
    case 'twitter':
      return <TwitterIcon />
    case 'email':
    default:
      return <EmailIcon />
  }
}

enum Social {
  github = 'https://github.com/marctorrelles',
  twitter = 'https://twitter.com/marctorrelles',
  email = 'mailto:marctorrelles@gmail.com'
}

const Footer = () => (
  <Container
    paddingTop={2}
    paddingBottom={2}
    paddingLeft={3}
    paddingRight={3}
    gap={2}
    width='100%'
    justifyContent='center'
    alignItems='center'
  >
    {Object.entries(Social).map(([key, value]) => (
      <Link href={value} active={false}>{getIcon(key)}</Link>
    ))}
  </Container>
)

export default Footer
