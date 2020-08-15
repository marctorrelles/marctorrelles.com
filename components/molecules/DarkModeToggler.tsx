import * as React from 'react'
import styled from 'styled-components'

import { useDarkMode } from '../../logic/darkModeContext'
import DarkModeIcon from '../../assets/images/dark-mode.svg'

const Container = styled.div`
  width: 2em;
  height: 2em;
`

const TogglerBoxContainer = styled.div`
  cursor: pointer;
  user-select: none;
`

const TogglerOption = styled.div<{ active: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  > svg {
    /* TODO: fix svg size... 😪 */
    position: absolute;
    top: 0;
    left: 0;
    transition: transform ease 0.25s;
    transform: scale(0.9) rotateY(${({ active }) => active ? 0 : 180}deg);
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
  const { darkMode, setDarkMode } = useDarkMode()

  React.useEffect(() => {
    // This makes the first render go from dark to light 😕
    if (process.browser && window.localStorage.getItem('darkMode') === 'false') {
      setDarkMode(false)
    }
  }, [])

  const onClick = () => {
    if (process.browser) {
      const value = darkMode ? 'false' : 'true'
      window.localStorage.setItem('darkMode', value)
    }
    setDarkMode(!darkMode)
  }

  return (
    <TogglerBoxContainer onClick={onClick}>
      <Container>
        <TogglerOption active={darkMode}>
          <DarkModeIcon />
        </TogglerOption>
      </Container>
    </TogglerBoxContainer>
  )
}

export default DarkModeToggler
