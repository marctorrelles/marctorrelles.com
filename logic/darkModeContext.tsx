import * as React from 'react'

const DEFAULT_DARK_MODE = true

type ContextProps = {
  darkMode: boolean
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

const DarkModeContext = React.createContext<Partial<ContextProps>>({})

type Props = {
  children: React.ReactNode
}

export const DarkMode = ({ children }: Props) => {
  const [darkMode, setDarkMode] = React.useState<boolean>(DEFAULT_DARK_MODE)

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => React.useContext(DarkModeContext)
