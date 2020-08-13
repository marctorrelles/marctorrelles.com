import * as React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const StyledLink = styled.a<{ active: boolean }>`
  text-decoration: none;
  color: ${({ theme, active }) => active ? theme.secondary : theme.primary};
  font-weight: 500;
  font-size: 1.2em;
  &:hover {
    text-decoration: underline;
  }
`

type Props = {
  href: string
  active: boolean
  children: React.ReactNode
}

const Link = ({ href, active, children }: Props) => {
  const router = useRouter()

  const onClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <StyledLink href={href} onClick={onClick} active={active}>
      {children}
    </StyledLink>
  )
}

export default Link
