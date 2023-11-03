import styled from "styled-components"
import { ThemeParams } from "../styles/theme"

type Size = "normal" | "big"

const StyledTitle = styled.h1<{ size: Size }>`
  font-size: ${({ size }) => (size === "big" ? 2.6 : 2)}rem;
  line-height: ${({ size }) => (size === "big" ? 3 : 2.6)}rem;
  font-weight: 400;
  // text-align: ${({ size }) => (size === "big" ? "center" : "left")};
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    font-size: ${({ size }) => (size === "big" ? 2 : 1.6)}rem;
    text-align: left;
  }
`

type Props = React.PropsWithChildren<{
  size?: Size
}>

export default function Title({ size, children, ...otherProps }: Props) {
  return (
    <StyledTitle size={size} {...otherProps}>
      {children}
    </StyledTitle>
  )
}
