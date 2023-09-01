import { motion } from "framer-motion"
import { styled } from "styled-components"
import { darkTheme, lightTheme } from "../styles/theme"

const VARIANTS = {
  top: {
    closed: {
      rotate: 0,
      translateY: 0,
      scale: 1,
    },
    opened: {
      rotate: 45,
      translateY: 2,
      scale: 1.2,
    },
  },
  center: {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  },
  bottom: {
    closed: {
      rotate: 0,
      translateY: 0,
      scale: 1,
    },
    opened: {
      rotate: -45,
      translateY: -2,
      scale: 1.2,
    },
  },
}

const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  z-index: 999;
  svg > line {
    stroke: ${lightTheme.primary};
  }
  @media (prefers-color-scheme: dark) {
    svg > line {
      stroke: ${darkTheme.primary};
    }
  }
`

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function HamburgerMenu({ open, setOpen }: Props) {
  const variant = open ? "opened" : "closed"

  const width = 28
  const height = 22
  const strokeWidth = 2

  const lineProps = {
    strokeWidth: strokeWidth as number,
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: variant,
    transition: { ease: "easeOut", duration: 0.2 },
  }
  const unitHeight = 4
  const unitWidth = (unitHeight * (width as number)) / (height as number)

  return (
    <Button title="Open mobile menu" onClick={() => setOpen(!open)}>
      <motion.svg
        viewBox={`0 0 ${unitWidth} ${unitHeight}`}
        overflow="visible"
        preserveAspectRatio="none"
        width={width}
        height={height}
      >
        <motion.line
          x1="0"
          x2={unitWidth}
          y1="0"
          y2="0"
          variants={VARIANTS.top}
          {...lineProps}
        />
        <motion.line
          x1="0"
          x2={unitWidth}
          y1="2"
          y2="2"
          variants={VARIANTS.center}
          {...lineProps}
        />
        <motion.line
          x1="0"
          x2={unitWidth}
          y1="4"
          y2="4"
          variants={VARIANTS.bottom}
          {...lineProps}
        />
      </motion.svg>
    </Button>
  )
}
