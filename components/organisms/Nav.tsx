import { useRouter } from "next/router";
import styled from "styled-components";

import { ThemeParams } from "../../styles/theme";
import Link from "../atoms/Link";
import DarkModeToggler from "../molecules/DarkModeToggler";

export enum Links {
  Home = "/",
  Blog = "/blog",
  About = "/about",
}

const Container = styled.div`
  width: 100%;
  padding: 3em;
  padding-top: 2em;
  padding-bottom: 2em;
  align-items: center;
  justify-content: space-between;
  > *:not(:last-child) {
    padding-bottom: 1em;
  }
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    padding: 1.5em;
    padding-bottom: 1em;
    align-items: flex-start;
  }
`;

const LinksContainer = styled.div`
  flex-direction: row;
  > *:not(:last-child) {
    padding-right: 2em;
  }
  @media (max-width: ${ThemeParams.MobileBreakpoint}px) {
    flex-direction: column;
    align-items: flex-start;
    > *:not(:last-child) {
      padding-bottom: 0.25em;
    }
  }
`;

const Nav = () => {
  const pathname = useRouter().pathname || Links.Home;

  return (
    <Container>
      <LinksContainer>
        {Object.entries(Links).map(([key, value]) => {
          const active = pathname === value;
          return (
            <Link key={value} href={value} active={active} size={1.2}>
              {key}
            </Link>
          );
        })}
      </LinksContainer>
      <DarkModeToggler />
    </Container>
  );
};

export default Nav;
