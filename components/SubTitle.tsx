import styled from 'styled-components'
import { ThemeParams } from '../styles/theme'
import Title from './Title';

const StyledSubTitle = styled(Title)`
  font-size: 1.7rem;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    1.4rem;
  }
`

export default function SubTitle({ children, ...otherProps }) {
  return <StyledSubTitle as='h2' {...otherProps}>{children}</StyledSubTitle>
}
