import * as React from 'react'
import { ThemeParams } from '../styles/theme'

const MobileContext = React.createContext<boolean>(false)

type Props = {
  children: React.ReactNode
}

export const MobileProvider = ({ children }: Props) => {
  const [width, setWidth] = React.useState(1000)

  React.useEffect(() => {
    const checkWindowWidth = () => {
      if (window && window.innerWidth !== width) {
        setWidth(window.innerWidth)
      }
    }

    window.addEventListener('resize', checkWindowWidth)
    checkWindowWidth()

    return () => window.removeEventListener('resize', checkWindowWidth)
  }, [])

  const isMobile = width < ThemeParams.MobileBreakpoint

  return (
    <MobileContext.Provider value={isMobile}>
      {children}
    </MobileContext.Provider>
  )
}

export const useMobile = () => React.useContext(MobileContext)
