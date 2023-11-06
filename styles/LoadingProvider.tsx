import * as React from "react"
import { useState } from "react"

type ProviderProps = {
  children: React.ReactNode
}

type ContextType = {
  loading: boolean
  setThreeLoaded: (loading: boolean) => void
  setFontsLoaded: (loading: boolean) => void
}

const Context = React.createContext<ContextType>({
  loading: true,
  setThreeLoaded: (_loading: boolean) => {},
  setFontsLoaded: (_loading: boolean) => {},
})

export const LoadingProvider = ({ children }: ProviderProps) => {
  const [threeLoaded, setThreeLoaded] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)

  const loading = !threeLoaded || !fontsLoaded

  return (
    <Context.Provider value={{ loading, setThreeLoaded, setFontsLoaded }}>
      {children}
    </Context.Provider>
  )
}

export const useLoading = (): ContextType => {
  if (typeof window === "undefined") {
    return {
      loading: true,
      setThreeLoaded: (_loading: boolean) => {},
      setFontsLoaded: (_loading: boolean) => {},
    }
  }

  const context = React.useContext(Context)

  if (!context)
    throw new Error("useLoading must be used within a LoadingProvider")

  return context
}
