import NextLink from "next/link"
import styled from "styled-components"

const LinkWrap = styled.span<{
  $active?: boolean
  $size?: Number
}>`
  > a {
    transition: color ease 0.25s;
    text-decoration: none;
    color: ${({ theme, $active }) =>
      $active ? theme.secondary : theme.primary};
    font-size: ${({ $size }) => $size && $size.toString()}em;
    > svg > path:last-child {
      transition: fill ease 0.25s;
      fill: ${({ theme, $active }) =>
        $active ? theme.secondary : theme.primary};
    }
    &:hover {
      text-decoration: underline;
      > svg > path:last-child {
        fill: ${({ theme }) => theme.secondary};
      }
    }
  }
`

type Props = {
  active?: boolean
  size?: Number
  href: string
  target?: "_blank"
  children: React.ReactNode
  component?: React.ElementType
}

const Link = ({
  target,
  active = true,
  size,
  href,
  component,
  children,
}: Props) => {
  return (
    <LinkWrap $active={active} $size={size} as={component}>
      {target ? (
        <a target={target} href={href}>
          {children}
        </a>
      ) : (
        <NextLink href={href}>{children}</NextLink>
      )}
    </LinkWrap>
  )
}

export default Link
