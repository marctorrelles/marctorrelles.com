import { styled } from "styled-components"
import { darkTheme, lightTheme } from "../../styles/theme"
import Text from "../Text"
import Icon from "./Icon"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const buttonVariants = {
  fetching: {
    opacity: 0.5,
  },
  regular: {
    opacity: 1,
  },
}

const clappingIndicatorProps = {
  initial: {
    opacity: 0,
    scale: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0,
    y: 20,
  },
}

const clapIndicatorProps = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
  transition: {
    duration: 0.2,
  },
}

const Button = motion(styled.button<{ disabled: boolean }>`
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
  ${({ disabled }) =>
    disabled
      ? ""
      : `
  &:hover {
    color: ${lightTheme.secondary};
    path {
      fill: ${lightTheme.secondary};
    }
  }
  `}
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

const ClappingIndicator = motion(styled.div`
  position: absolute;
  top: -80px;
  width: 70px;
  height: 70px;
  background-color: ${darkTheme.primary};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
`)

const ClapIndicator = motion(styled.p<{ kind: "number" | "claps" }>`
  position: absolute;
  color: ${darkTheme.background};
  margin: 0;
  padding: 0;
  font-size: ${({ kind }) => (kind === "number" ? "1.5rem" : "0.8rem")};
  font-weight: ${({ kind }) => (kind === "number" ? "400" : "normal")};
  top: ${({ kind }) => (kind === "number" ? "10px" : "40px")};
`)

const CounterText = motion(styled(Text)<{ styleWidth?: number }>`
  font-weight: 400 !important;
  ${({ styleWidth }) => (styleWidth ? `width: ${styleWidth}px;` : "")}
`)

type Props = {
  slug: string
}

let timer: NodeJS.Timeout

export default function ClapCounter({ slug }: Props) {
  const [fetching, setFetching] = useState(false)
  const [claps, setClaps] = useState<number>()
  const [lastClap, setLastClap] = useState<number>()
  const [temporaryClaps, setTemporaryClaps] = useState<number>(0)
  const [counterWidth, setCounterWidth] = useState<number>()

  // Hack to prevent the counter from jumping around
  const counterRef = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    if (counterRef.current && !counterWidth && claps) {
      setCounterWidth(counterRef.current.offsetWidth)
    }
  }, [counterRef.current, counterWidth, claps])

  useEffect(() => {
    async function fetchClaps() {
      if (fetching) return

      try {
        setFetching(true)
        const res = await fetch(`/api/claps/read?slug=${slug}`)
        const { claps } = await res.json()
        setClaps(claps)
      } catch (err) {
        console.error(err)
      } finally {
        setFetching(false)
      }
    }
    fetchClaps()

    return () => {
      timer && clearTimeout(timer)
    }
  }, [])

  const resetTimer = (newClaps: number) => {
    timer = setTimeout(async () => {
      try {
        await fetch(`/api/claps/clap?slug=${slug}&by=${newClaps}`)
        setTemporaryClaps(0)
        setClaps(claps + newClaps)
      } catch (err) {
        console.error(err)
      }
    }, 1400)
  }

  const handleClap = async () => {
    setLastClap(Date.now())
    clearTimeout(timer)
    setTemporaryClaps((prev) => {
      const newClaps = prev === 99 ? prev : prev + 1
      resetTimer(newClaps)
      return newClaps
    })
  }

  return (
    <Button
      disabled={fetching}
      variants={buttonVariants}
      animate={fetching ? "fetching" : "regular"}
      onClick={handleClap}
    >
      <Icon lastClap={lastClap} />
      {!fetching && (
        <AnimatePresence mode="wait" initial={false}>
          <CounterText
            styleWidth={counterWidth}
            ref={counterRef}
            key={claps?.toString()}
            {...clapIndicatorProps}
          >
            {claps ?? 0}
          </CounterText>
        </AnimatePresence>
      )}
      <AnimatePresence mode="wait">
        {temporaryClaps > 0 && (
          <ClappingIndicator {...clappingIndicatorProps}>
            <AnimatePresence mode="sync">
              <ClapIndicator
                key={temporaryClaps.toString()}
                kind="number"
                {...clapIndicatorProps}
              >
                {temporaryClaps}
              </ClapIndicator>
              <ClapIndicator
                key={temporaryClaps === 1 ? "singular" : "plural"}
                kind="claps"
                {...clapIndicatorProps}
              >
                {temporaryClaps === 1 ? "clap" : "claps"}!
              </ClapIndicator>
            </AnimatePresence>
          </ClappingIndicator>
        )}
      </AnimatePresence>
    </Button>
  )
}
