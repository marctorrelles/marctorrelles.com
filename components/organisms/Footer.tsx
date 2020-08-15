import styled from 'styled-components'

import Link from '../atoms/Link'
import Note from '../atoms/Note'

import GithubIcon from '../../assets/images/github.svg'
import TwitterIcon from '../../assets/images/twitter.svg'
import EmailIcon from '../../assets/images/email.svg'

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2em;
  width: 100%;
  > *:not(:last-child) {
    padding-bottom: 1em;
  }
`

const LinksContainer = styled.div`
  ustify-content: center;
  align-items: center;
  > *:not(:last-child) {
    padding-right: 2em;
  }
`

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

const NextLink = () => <Link href='https://nextjs.org/' target='_blank'>Next.js</Link>
const NetlifyLink = () => <Link href='https://www.netlify.com/' target='_blank'>Netlify</Link>

const Footer = () => (
  <Container>
    <LinksContainer>
      {Object.entries(Social).map(([key, value]) => (
        <Link key={key} href={value} active={false} target='_blank'>
          {getIcon(key)}
        </Link>
      ))}
    </LinksContainer>
    <Note>
      Made with ♥️ using <NextLink /> and <NetlifyLink />
    </Note>
  </Container>
)

export default Footer
