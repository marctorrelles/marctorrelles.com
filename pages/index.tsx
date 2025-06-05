import Link from "../components/Link"
import PageContainer from "../components/PageContainer"
import Text from "../components/Text"

const About = () => (
  <PageContainer>
    <Text>I'm a software developer, currently based in Barcelona.</Text>
    <Text>
      I believe that web can be fun, diverse and inspiring. I love to experiment
      with new stuff, so I'm probably building or playing with something right
      now.
    </Text>
    <Text>
      I'm always excited about new projects and collaborations. So don't
      hesitate to contact me if you think we can make a good team.
    </Text>
    <Text>
      <Link href="/experience">See my experience →</Link>
    </Text>
  </PageContainer>
)

export default About
