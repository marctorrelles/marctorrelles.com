import styled from 'styled-components'
import { ThemeParams } from '../styles/theme'

const StyledTitle = styled.h1<{ big: boolean }>`
  font-family: monospace;
  font-size: ${({ big }) => big ? 2.6 : 2}rem;
  font-weight: 600;
  text-align: ${({ big }) => big ? 'center' : 'left'};
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    font-size: ${({ big }) => big ? 2 : 1.6 }rem;
    text-align: left;
  }
`

type Props = React.PropsWithChildren<{
  big?: boolean
}>

export default function Title({ big, children, ...otherProps }:Props) {
  return <StyledTitle big={big} {...otherProps}>{children}</StyledTitle>
}
