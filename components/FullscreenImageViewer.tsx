import NextImage from "next/image"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

const TRANSITION_DURATION = 250

const Overlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity ${TRANSITION_DURATION}ms ease-out;
  pointer-events: ${({ $isVisible }) => ($isVisible ? "auto" : "none")};
`

const ImageWrapper = styled.div<{
  $maxWidth?: number
  $isVisible: boolean
  $computedMaxWidth?: number
  $computedMaxHeight?: number
}>`
  position: fixed;
  left: 50%;
  top: 50%;
  width: fit-content;
  height: fit-content;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: translate(-50%, -50%);
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity ${TRANSITION_DURATION}ms ease-out;

  img {
    max-width: ${({ $computedMaxWidth }) =>
      $computedMaxWidth && $computedMaxWidth < Infinity
        ? `${$computedMaxWidth}px`
        : "calc(100vw - 1rem)"};
    max-height: ${({ $computedMaxHeight }) =>
      $computedMaxHeight && $computedMaxHeight < Infinity
        ? `${$computedMaxHeight}px`
        : "calc(100vh - 1rem)"};
    width: auto;
    height: auto;
    object-fit: contain;
    cursor: pointer;
    display: block;
  }
`

type Props = {
  src: string
  alt: string
  width: number
  height: number
  isOpen: boolean
  onClose: () => void
}

export default function FullscreenImageViewer({
  src,
  alt,
  width,
  height,
  isOpen,
  onClose,
}: Props) {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [naturalDimensions, setNaturalDimensions] = useState<{
    width: number
    height: number
  } | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const img = new Image()
      img.onload = () => {
        setNaturalDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        })
      }
      img.src = src

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      })
    } else {
      setIsVisible(false)
      setNaturalDimensions(null)
    }
  }, [isOpen, src])

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"

      let scrollTimeout: NodeJS.Timeout
      const handleScroll = () => {
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
          onClose()
        }, TRANSITION_DURATION)
      }

      const handleWheel = (e: WheelEvent) => {
        onClose()
      }

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose()
        }
      }

      window.addEventListener("scroll", handleScroll, {
        passive: true,
        capture: true,
      })
      window.addEventListener("wheel", handleWheel, { passive: true })
      window.addEventListener("keydown", handleEscape)

      return () => {
        clearTimeout(scrollTimeout)
        document.body.style.overflow = originalOverflow
        window.removeEventListener("scroll", handleScroll, { capture: true })
        window.removeEventListener("wheel", handleWheel)
        window.removeEventListener("keydown", handleEscape)
      }
    }
  }, [isOpen, onClose])

  if (!mounted) {
    return null
  }

  const padding = 16
  const maxViewportWidth = window.innerWidth - padding
  const maxViewportHeight = window.innerHeight - padding

  const naturalWidth = naturalDimensions?.width || width || Infinity
  const naturalHeight = naturalDimensions?.height || height || Infinity

  const computedMaxWidth = Math.min(maxViewportWidth, naturalWidth)
  const computedMaxHeight = Math.min(maxViewportHeight, naturalHeight)

  const finalMaxWidth = Math.min(computedMaxWidth, naturalWidth)
  const finalMaxHeight = Math.min(computedMaxHeight, naturalHeight)

  return createPortal(
    <Overlay
      $isVisible={isVisible}
      onClick={onClose}
      onTouchStart={onClose}
      onTouchMove={onClose}
    >
      <ImageWrapper
        $maxWidth={width}
        $isVisible={isVisible}
        $computedMaxWidth={finalMaxWidth}
        $computedMaxHeight={finalMaxHeight}
        onClick={onClose}
      >
        <NextImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={100}
          priority
          unoptimized
        />
      </ImageWrapper>
    </Overlay>,
    document.body
  )
}
