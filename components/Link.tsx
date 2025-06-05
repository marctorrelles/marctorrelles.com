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
  @media (prefers-color-scheme: dark) {
    mix-blend-mode: difference;
  }

  > a {
    text-decoration: none;
    display: inline-block;
  }

  ${({ $variant, $active, $size }) => `
      > a {
        ${
          $variant === "sidebar"
            ? `
            padding-top: 2px;
            padding-bottom: 2px;
          `
            : `
            padding-left: 2px;
            padding-right: 2px;
          `
        }
        ${
          $variant === "regular"
            ? `border-bottom: 1px solid ${lightTheme.dark};`
            : ""
        }
        ${$size ? `font-size: ${$size.toString()}em` : ""};
        color: ${$active ? lightTheme.secondary : lightTheme.primary};
        > svg > path:last-child {
          fill: ${$active ? lightTheme.secondary : lightTheme.primary};
        }
        transition: color ease 0.25s, background ease 0.25s;
        &:hover,
        &:focus,
        &:active {
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
          ${
            $variant === "regular"
              ? `border-bottom: 1px solid ${darkTheme.dark};`
              : ""
          }
          color: ${$active ? darkTheme.secondary : darkTheme.primary};
          > svg > path:last-child {
            fill: ${$active ? darkTheme.secondary : darkTheme.primary};
          }
          &:hover,
          &:focus,
          &:active {
            color: ${lightTheme.primary};
            background: ${lightTheme.background};
            > svg > path:last-child {
              fill: ${darkTheme.secondary};
            }
          }
        }
      }
    `}}
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
  className?: string
}

const Link = ({
  onClick,
  target,
  active = true,
  size,
  href,
  component,
  variant = "regular",
  children,
  className,
}: Props) => {
  return (
    <LinkWrap
      $active={active}
      $size={size}
      $variant={variant}
      as={component}
      className={className}
    >
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
