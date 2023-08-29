import PageContainer from "../components/organisms/PageContainer"
import Title from "../components/atoms/Title"
import Text from "../components/atoms/Text"
import Link from "../components/atoms/Link"

const FactorialLink = () => (
  <Link href="https://factorialhr.com" target="_blank">
    Factorial
  </Link>
)
const QuipuLink = () => (
  <Link href="https://getquipu.com" target="_blank">
    Quipu
  </Link>
)
const FuelbannerLink = () => (
  <Link href="https://fuelbanner.com" target="_blank">
    Fuelbanner
  </Link>
)
const ParlemLink = () => (
  <Link href="https://parlem.com" target="_blank">
    Parlem
  </Link>
)
const TicketsLink = () => (
  <Link href="https://4tickets.cat" target="_blank">
    4Tickets
  </Link>
)

const About = () => (
  <PageContainer>
    <Title>About me 🖐</Title>
    <Text>Thanks for getting here!</Text>
    <Text>
      I'm Marc, a software engineer based in Barcelona. I've been working in
      software for the last 10 years, when I developed my passion and my job:
      coding 👨‍💻
    </Text>
    <Text>
      If I'm not pressing keys, you will find me reading, playing videogames,
      running or having a beer (ehmmm... okay, most of the times it's having a
      beer). I love to be challenged and face new problems, and also learn while
      solving those. I also like to get things perfectly done, so most of the
      times I spend some extra time in the little details 🌱
    </Text>
    <Text>
      I'm currently working as a Fullstack Engineer at <FactorialLink />,
      helping companies to digitalize their HR processes. Some of my last jobs
      include <QuipuLink />, an accounting and administration software for
      businesses, and also <FuelbannerLink />, <ParlemLink /> and{" "}
      <TicketsLink />
    </Text>
    <Text>
      I'm excited about new projects and collaborations! So don't hesitate to
      contact me if you think we can make a good team 🤜🤛 You can reach me
      through{" "}
      <Link href="https://github.com/marctorrelles" target="_blank">
        Github
      </Link>
      , <Link href="mailto:marctorrelles@gmail.com">email</Link> or{" "}
      <Link href="https://twitter.com/marctorrelles">Twitter</Link>
    </Text>
  </PageContainer>
)

export default About
