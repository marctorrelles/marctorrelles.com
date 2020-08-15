import NextLink from 'next/link'
import styled from 'styled-components'

type LinkWrapProps = {
  active?: boolean
  size?: Number
}

const LinkWrap = styled.span<LinkWrapProps>`
  > a {
    text-decoration: none;
    color: ${({ theme, active }) => active ? theme.secondary : theme.primary};
    font-weight: 500;
    font-size: ${({ size }) => size && size.toString()}em;
    transition: color ease 0.25s, fill ease 0.25s;
    > svg path:last-child {
      fill: ${({ theme, active }) => active ? theme.secondary : theme.primary};
    }
    &:hover {
      text-decoration: underline;
      > svg path:last-child {
        fill: ${({ theme }) => theme.secondary};
      }
    }
  }
`

type Props = LinkWrapProps & {
  href: string
  target?: '_blank'
  children: React.ReactNode
}

const Link = ({ target, active = true, size, href, children }: Props) => (
  <LinkWrap active={active} size={size}>
    {target ? (
      <a target={target} href={href}>
        {children}
      </a>
    ) : (
      <NextLink href={href}>
        {children}
      </NextLink>
    )}
  </LinkWrap>
)

export default Link
