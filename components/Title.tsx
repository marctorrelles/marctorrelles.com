import styled from "styled-components"
import { ThemeParams } from "../styles/theme"

type Size = "normal" | "big" | "small"

const StyledTitle = styled.h1<{ size: Size; noMargin?: boolean }>`
  font-size: ${({ size }) =>
    size === "big" ? 2.6 : size === "small" ? 1.6 : 2}rem;
  line-height: ${({ size }) =>
    size === "big" ? 3 : size === "small" ? 2.6 : 2.6}rem;
  font-weight: 400;

  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    font-size: ${({ size }) =>
      size === "big" ? 2 : size === "small" ? 1.4 : 1.8}rem;
    text-align: left;
  }

  ${({ noMargin }) =>
    noMargin &&
    `
    margin: 0;
    padding: 0;
`}
`

type Props = React.PropsWithChildren<{
  size?: Size
  noMargin?: boolean
}>

export default function Title({
  size,
  children,
  noMargin,
  ...otherProps
}: Props) {
  return (
    <StyledTitle size={size} noMargin={noMargin} {...otherProps}>
      {children}
    </StyledTitle>
  )
}
