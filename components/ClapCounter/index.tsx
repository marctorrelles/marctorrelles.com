import { styled } from "styled-components"
import { darkTheme, lightTheme } from "../../styles/theme"
import Text from "../Text"
import Icon from "./Icon"
import { useEffect, useState } from "react"
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
  border-radius: 50%;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "cursor" : "pointer")};
  background-color: transparent;
  padding: 0.2rem;
  gap: 0.5rem;
  justify-content: center;
  color: ${lightTheme.primary};
  font-size: 1rem;
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
      fill: green;
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
  left: 0;
  width: 70px;
  height: 70px;
  background-color: ${darkTheme.primary};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: center;
  justify-content: center;
`)

const ClapIndicator = motion(styled(Text)<{ kind: "number" | "claps" }>`
  position: absolute;
  color: ${darkTheme.background};
  margin: 0;
  padding: 0;
  font-size: ${({ kind }) => (kind === "number" ? "1.5rem" : "0.8rem")};
  font-weight: ${({ kind }) => (kind === "number" ? "400" : "normal")};
  top: ${({ kind }) => (kind === "number" ? "10px" : "40px")};
`)

const MotionText = motion(Text)

type Props = {
  slug: string
}

let timer: NodeJS.Timeout

export default function ClapCounter({ slug }: Props) {
  const [fetching, setFetching] = useState(false)
  const [claps, setClaps] = useState<number>()
  const [lastClap, setLastClap] = useState<number>()
  const [temporaryClaps, setTemporaryClaps] = useState<number>(0)

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
        <AnimatePresence mode="wait" initial>
          <MotionText key={claps?.toString()} {...clapIndicatorProps}>
            {claps ?? 0}
          </MotionText>
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
