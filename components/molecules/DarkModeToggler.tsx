import * as React from 'react'
import styled, { ThemeContext } from 'styled-components'

import { Theme } from '../../styles/theme'
import { useDarkMode } from '../../logic/darkModeContext'
import Container from '../atoms/Container'

const TogglerBoxContainer = styled.div<{ theme: Theme }>`
  position: absolute;
  top: 1em;
  right: 1em;
  transition: background-color ease 0.33s;
  cursor: pointer;
  user-select: none;
`

const TogglerOption = styled.div<{ active: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity ease 0.33s;
  opacity: ${({ active }) => active ? 1 : 0};
`

type Props = {
  active: Boolean,
  onToggle: (event: any) => void,
  left: React.ReactNode,
  right: React.ReactNode
}

const DarkModeToggler = () => {
  const themeContext = React.useContext(ThemeContext)
  const {darkMode, setDarkMode} = useDarkMode()
  const onToggle = () => setDarkMode(!darkMode)

  return (
    <TogglerBoxContainer onClick={onToggle}>
      <Container
        width={2.2}
        height={2.2}
        borderRadius={5}
        background={themeContext.primary}
      >
        <TogglerOption active={darkMode}>
          <span>☀️</span>
        </TogglerOption>
        <TogglerOption active={!darkMode}>
          <span>🌙</span>
        </TogglerOption>
      </Container>
    </TogglerBoxContainer>
  )
}

export default DarkModeToggler
