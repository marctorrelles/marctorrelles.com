import styled from "styled-components";

import Link from "../atoms/Link";
import Note from "../atoms/Note";

import GithubIcon from "../../public/github.svg";
import TwitterIcon from "../../public/twitter.svg";
import EmailIcon from "../../public/email.svg";

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2em;
  width: 100%;
  > *:not(:last-child) {
    padding-bottom: 1em;
  }
`;

const LinksContainer = styled.div`
  ustify-content: center;
  align-items: center;
  > *:not(:last-child) {
    padding-right: 2em;
  }
`;

enum Social {
  github = "https://github.com/marctorrelles",
  twitter = "https://twitter.com/marctorrelles",
  email = "mailto:marctorrelles@gmail.com",
}

type SocialKey = keyof typeof Social;

const getIcon = (icon: keyof typeof Social) => {
  switch (icon) {
    case "github":
      return <GithubIcon />;
    case "twitter":
      return <TwitterIcon />;
    case "email":
      return <EmailIcon />;
  }
};

const NextLink = () => (
  <Link href="https://nextjs.org/" target="_blank">
    Next.js
  </Link>
);
const NetlifyLink = () => (
  <Link href="https://www.netlify.com/" target="_blank">
    Netlify
  </Link>
);

const Footer = () => (
  <Container>
    <LinksContainer>
      {Object.entries(Social).map(
        ([key, value]: [SocialKey, (typeof Social)[SocialKey]]) => (
          <Link key={key} href={value} active={false} target="_blank">
            {getIcon(key)}
          </Link>
        )
      )}
    </LinksContainer>
    <Note>
      Made with ♥️ using <NextLink /> and <NetlifyLink />
    </Note>
  </Container>
);

export default Footer;
