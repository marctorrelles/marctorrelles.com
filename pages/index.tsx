import PageContainer from "../components/PageContainer"
import Title from "../components/Title"
import Text from "../components/Text"
import Link from "../components/Link"
import { Links } from "../components/Nav"

const About = () => (
  <PageContainer>
    <Title>Hey there! 👋</Title>
    <Text>I'm Marc, a builder and software engineer based in Barcelona.</Text>
    <Text>
      If I'm not pressing keys, you will find me listening to music, reading,
      playing videogames, running or just hanging out with my friends. I love to
      be challenged and face new problems, and also learn while solving those. I
      also like to get things perfectly done, so most of the times I spend some
      extra time in the little details.
    </Text>
    <Text>
      I've recently started to write stuff, not only technical but whatever that
      comes my way. <Link href={Links.Posts}>Check it out!</Link>
    </Text>
    <Text>
      I'm always excited about new projects and collaborations! So don't
      hesitate to contact me if you think we can make a good team.
    </Text>
  </PageContainer>
)

export default About
