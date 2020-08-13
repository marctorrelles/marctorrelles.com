import * as React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

type StyledLinkProps = {
  active: boolean
  size: Number
}

const StyledLink = styled.a<StyledLinkProps>`
  text-decoration: none;
  color: ${({ theme, active }) => active ? theme.secondary : theme.primary};
  font-weight: 500;
  font-size: ${({ size }) => size && size.toString()}em;
  transition: fill ease 0.25s;
  > svg path:last-child {
    fill: ${({ theme, active }) => active ? theme.secondary : theme.primary};
  }
  &:hover {
    text-decoration: underline;
    > svg path:last-child {
      fill: ${({ theme }) => theme.secondary};
    }
  }
`

type Props = {
  href: string
  target?: '_blank'
  active?: boolean
  size?: Number
  children: React.ReactNode
}

const Link = ({ href, target, active = true, size = 1, children }: Props) => {
  const router = useRouter()

  const onClick = (e) => {
    e.preventDefault()

    if (target === '_blank') {
      return window.open(href, target)
    }

    router.push(href)
  }

  return (
    <StyledLink
      href={href}
      target={target}
      onClick={onClick}
      active={active}
      size={size}
    >
      {children}
    </StyledLink>
  )
}

export default Link
