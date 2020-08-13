import * as React from 'react'

type ContextProps = {
  darkMode: boolean
  toggleDarkMode: () => void
}

const DarkModeContext = React.createContext<Partial<ContextProps>>({})

type Props = {
  children: React.ReactNode
}

export const DarkMode = ({ children }: Props) => {
  const [darkMode, setDarkMode] = React.useState<boolean>(true)

  const toggleDarkMode = () => {
    const value = !darkMode
    setDarkMode(value)
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => React.useContext(DarkModeContext)
