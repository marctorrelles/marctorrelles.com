import NextLink from "next/link"
import styled from "styled-components"
import { darkTheme, lightTheme } from "../styles/theme"

type Variant = "regular" | "sidebar" | "nav"

const LinkWrap = styled.span<{
  $active?: boolean
  $size?: Number
  $variant: Variant
}>`
  cursor: pointer;
  > a {
    ${({ $variant }) => {
      if ($variant === "sidebar") {
        return `
        padding-top: 2px;
        padding-bottom: 2px;
      `
      } else {
        return `
      padding-left: 2px;
      padding-right: 2px;
      `
      }
    }}
    transition: color ease 0.25s;
    ${({ $variant }) =>
      $variant === "regular"
        ? `border-bottom: 1px solid ${lightTheme.dark};`
        : ""}
    text-decoration: none;
    ${({ $size }) => $size && `font-size: ${$size.toString()}em`};
    color: ${({ $active }) =>
      $active ? lightTheme.secondary : lightTheme.primary};
    > svg > path:last-child {
      transition: fill ease 0.25s;
      fill: ${({ $active }) =>
        $active ? lightTheme.secondary : lightTheme.primary};
    }
    &:hover {
      color: ${darkTheme.primary};
      background: ${darkTheme.background};
      text-decoration: none;
      > svg > path:last-child {
        fill: ${lightTheme.secondary};
      }
    }
  }
  @media (prefers-color-scheme: dark) {
    > a {
      ${({ $variant }) =>
        $variant === "regular"
          ? `border-bottom: 1px solid ${darkTheme.dark};`
          : ""}
      color: ${({ $active }) =>
        $active ? darkTheme.secondary : darkTheme.primary};
      > svg > path:last-child {
        fill: ${({ $active }) =>
          $active ? darkTheme.secondary : darkTheme.primary};
      }
      &:hover {
        color: ${lightTheme.primary};
        background: ${lightTheme.background};
        > svg > path:last-child {
          fill: ${darkTheme.secondary};
        }
      }
    }
  }
`

type Props = {
  onClick?: Function
  active?: boolean
  size?: Number
  href?: string
  target?: "_blank"
  children: React.ReactNode
  component?: React.ElementType
  variant?: Variant
}

const Link = ({
  onClick, // Not ultra fan of this, let's keep it for simplicity but this is not a real link...
  target,
  active = true,
  size,
  href,
  component,
  variant = "regular",
  children,
}: Props) => {
  return (
    <LinkWrap $active={active} $size={size} $variant={variant} as={component}>
      {onClick ? (
        <a onClick={() => onClick()}>{children}</a>
      ) : target ? (
        <a target={target} href={href}>
          {children}
        </a>
      ) : (
        <NextLink href={href} scroll={false}>
          {children}
        </NextLink>
      )}
    </LinkWrap>
  )
}

export default Link
