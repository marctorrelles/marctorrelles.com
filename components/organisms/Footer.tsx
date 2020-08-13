import * as React from 'react'

import Container from '../layout/Container'
import Link from '../atoms/Link'
import Note from '../atoms/Note'

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
    gap={1.2}
    width='100%'
    flexDirection='column'
    alignItems='center'
  >
    <Container gap={2} justifyContent='center'alignItems='center'>
      {Object.entries(Social).map(([key, value]) => (
        <Link key={key} href={value} active={false} target='_blank'>
          {getIcon(key)}
        </Link>
      ))}
    </Container>
    <Note>
      Made with ❤️ using <Link href='https://nextjs.org/' target='_blank'>Next.js</Link>
    </Note>
  </Container>
)

export default Footer
