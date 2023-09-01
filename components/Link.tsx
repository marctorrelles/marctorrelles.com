import NextLink from "next/link"
import styled from "styled-components"
import { darkTheme, lightTheme } from "../styles/theme"

function getColorSchemeLinkStyle(theme: "dark" | "light", $active?: boolean) {
  const getColor = () => {
    if (theme === "dark") {
      if ($active) {
        return darkTheme.secondary
      }
      return darkTheme.primary
    }
    if (theme === "light") {
      if ($active) {
        return lightTheme.secondary
      }
      return lightTheme.primary
    }
  }

  return `
  @media (prefers-color-scheme: ${theme}) {
    > a {
      color: ${getColor()};
      > svg > path:last-child {
        fill: ${getColor()};
      }
      &:hover {
        > svg > path:last-child {
          fill: ${(theme === "dark" ? darkTheme : lightTheme).secondary};
        }
      }
    }
  }
  `
}

const LinkWrap = styled.span<{
  $active?: boolean
  $size?: Number
}>`
  > a {
    transition: color ease 0.25s;
    text-decoration: none;
    ${({ $size }) => $size && `font-size: ${$size.toString()}em`};
    > svg > path:last-child {
      transition: fill ease 0.25s;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  ${({ $active }) => getColorSchemeLinkStyle("dark", $active)}
  ${({ $active }) => getColorSchemeLinkStyle("light", $active)}
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
