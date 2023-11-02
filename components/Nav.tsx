import { useRouter } from "next/router"
import styled from "styled-components"

import { motion } from "framer-motion"
import {
  INNER_SEPARATION,
  ThemeParams,
  darkTheme,
  lightTheme,
} from "../styles/theme"
import Link from "./Link"

export const NAV_HEIGHT = {
  regular: "4.8em",
  mobile: "4em",
}

export enum Links {
  About = "/",
  Posts = "/posts",
  Projects = "/projects",
  Photos = "/photos",
  RSS = "/rss.xml",
}

const Container = motion(styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`)

const ContainerContent = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  gap: 4px;
  padding: ${INNER_SEPARATION}px;
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    font-size: 0.9em;
  }
`

const Nav = () => {
  const pathname = useRouter().pathname || Links.About

  return (
    <Container
      variants={{
        hidden: { y: "-100%" },
        visible: { y: 0 },
      }}
      initial={false}
      transition={{
        type: "just",
      }}
    >
      <ContainerContent>
        {Object.entries(Links).map(([key, value]) => {
          const active = value === pathname
          return (
            <Link key={value} href={value} active={active} size={1.2}>
              {key}
            </Link>
          )
        })}
      </ContainerContent>
    </Container>
  )
}

export default Nav
