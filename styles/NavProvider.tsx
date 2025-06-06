import * as React from "react"
import { useState } from "react"

type NavProviderProps = {
  children: React.ReactNode
}

type ContextType = {
  navOpen: boolean
  setNavOpen: (navOpen: boolean) => void
}

const Context = React.createContext<ContextType>({
  navOpen: false,
  setNavOpen: (_: boolean) => {},
})

export const NavProvider = ({ children }: NavProviderProps) => {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <Context.Provider value={{ navOpen, setNavOpen }}>
      {children}
    </Context.Provider>
  )
}

export const useNav = (): ContextType => {
  if (typeof window === "undefined") {
    return {
      navOpen: false,
      setNavOpen: (_: boolean) => {},
    }
  }

  const context = React.useContext(Context)

  if (!context) throw new Error("useNav must be used within a NavProvider")

  return context
}
