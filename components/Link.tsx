import NextLink from "next/link"
import styled from "styled-components"
import { darkTheme, lightTheme } from "../styles/theme"

const LinkWrap = styled.span<{
  $active?: boolean
  $size?: Number
}>`
  > a {
    transition: color ease 0.25s;
    text-decoration: none;
    ${({ $size }) => $size && `font-size: ${$size.toString()}em`};
    color: ${({ $active }) => $active ? lightTheme.secondary : lightTheme.primary};
    > svg > path:last-child {
      transition: fill ease 0.25s;
      fill: ${({ $active }) => $active ? lightTheme.secondary : lightTheme.primary};
    }
    &:hover {
      text-decoration: underline;
      > svg > path:last-child {
        fill: ${lightTheme.secondary};
      }
    }
  }
  @media (prefers-color-scheme: dark) {
    > a {
      color: ${({ $active }) => $active ? darkTheme.secondary : darkTheme.primary};
      > svg > path:last-child {
        fill: ${({ $active }) => $active ? darkTheme.secondary : darkTheme.primary};
      }
      &:hover {
        > svg > path:last-child {
          fill: ${darkTheme.secondary};
        }
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
