import * as React from 'react'
import styled, { ThemeContext } from 'styled-components'

import { useDarkMode } from '../../logic/darkModeContext'
import Container from '../atoms/Container'
import DarkModeIcon from '../../images/dark-mode.svg'

const TogglerBoxContainer = styled.div`
  cursor: pointer;
  user-select: none;
`

const TogglerOption = styled.div<{ active: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  > svg {
    /* TODO: fix svg... 😪 */
    position: absolute;
    top: 0;
    left: 0;
    transition: all ease 0.25s;
    transform: scale(0.8) rotate(${({ active }) => active ? 0 : 180}deg);
    > circle {
      stroke: ${({ theme }) => theme.primary};
    }
    > path {
      fill: ${({ theme }) => theme.primary};
    }
  }
`

const DarkModeToggler = () => {
  const { darkMode, setDarkMode } = useDarkMode()
  const onToggle = () => setDarkMode(!darkMode)

  return (
    <TogglerBoxContainer onClick={onToggle}>
      <Container
        width={2.2}
        height={2.2}
      >
        <TogglerOption active={darkMode}>
          <DarkModeIcon />
        </TogglerOption>
      </Container>
    </TogglerBoxContainer>
  )
}

export default DarkModeToggler
