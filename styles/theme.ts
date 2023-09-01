export enum ThemeParams {
  MobileBreakpoint = 700
}

export type Theme = {
  background: string
  dark: string
  primary: string
  secondary: string
}

export const darkTheme: Theme = {
  background: '#222222',
  dark: 'rgba(255, 255, 255, 0.1)',
  primary: '#eeeeee',
  secondary: '#FAF888'
}

export const lightTheme: Theme = {
  background: '#f7f8f6',
  dark: 'rgba(0, 0, 0, 0.1)',
  primary: '#040404',
  secondary: '#38948e'
}
