export enum ThemeParams {
  MobileBreakpoint = 850,
}

export type Theme = {
  background: string
  dark: string
  primary: string
  secondary: string
}

export const darkTheme: Theme = {
  background: "#111111",
  dark: "rgba(255, 255, 255, 0.1)",
  primary: "#eeeeee",
  secondary: "#999999",
}

export const lightTheme: Theme = {
  background: "#EEEEEE",
  dark: "rgba(0, 0, 0, 0.05)",
  primary: "#040404",
  secondary: "#333333",
}

export const MAIN_SEPARATION = 32
export const INNER_SEPARATION = {
  Desktop: 42,
  Mobile: 24,
}
