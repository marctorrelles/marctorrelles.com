import { motion } from "framer-motion"
import { styled } from "styled-components"
import { darkTheme, lightTheme } from "../styles/theme"

const Button = motion(styled.button<{ disabled?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "cursor" : "pointer")};
  background-color: transparent;
  padding: 0.2rem;
  gap: 0.4rem;
  justify-content: center;
  font-size: 1rem;
  color: ${lightTheme.primary};
  path {
    fill: ${lightTheme.primary};
  }
  @media (prefers-color-scheme: dark) {
    color: ${darkTheme.primary};
    path {
      fill: ${darkTheme.primary};
    }
    ${({ disabled }) =>
      disabled
        ? ""
        : `&:hover {
      color: ${darkTheme.secondary};
      path {
        fill: ${darkTheme.secondary};
      }
    }
    `}
  }
`)

export default Button
