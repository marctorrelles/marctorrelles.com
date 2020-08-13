import * as React from 'react'
import styled from 'styled-components'

import { useDarkMode } from '../logic/darkModeContext'
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
    transition: transform ease 0.25s;
    transform: scale(0.8) rotate(${({ active }) => active ? 0 : 180}deg);
    > circle {
      transition: stroke ease 0.25s;
      stroke: ${({ theme }) => theme.primary};
    }
    > path {
      transition: fill ease 0.25s;
      fill: ${({ theme }) => theme.primary};
    }
  }
`

const DarkModeToggler = () => {
  const { darkMode, toggleDarkMode } = useDarkMode()

  return (
    <TogglerBoxContainer onClick={toggleDarkMode}>
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
