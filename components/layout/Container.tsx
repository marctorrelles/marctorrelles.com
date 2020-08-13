import * as React from 'react'
import styled from 'styled-components'

type StyledContainerProps = {
  background?: string
  height?: 'inherit' | '100%' | number
  width?: 'inherit' | '100%' | number
  borderRadius?: number
  flexDirection?: 'row' | 'column'
  alignItems?: 'flex-start' | 'flex-end' | 'center'
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'
  padding?: number
  paddingTop?: number
  paddingBottom?: number
  paddingLeft?: number
  paddingRight?: number
}

const StyledConainer = styled.div<StyledContainerProps>`
  display: flex;
  box-sizing: border-box;
  ${({ background }) => background ? `background: ${ background };` : ''}
  ${({ height }) => height ? `height: ${(typeof height === 'number' ? `${height}em` : height)};` : ''}
  ${({ width }) => width ? `width: ${(typeof width === 'number' ? `${width}em` : width)};` : ''}
  ${({ borderRadius }) => borderRadius ? `border-radius: ${borderRadius}px` : ''};
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  ${({ padding }) => padding ? `padding: ${padding}em;` : ''}
  ${({ paddingTop }) => paddingTop ? `padding-top: ${paddingTop}em;` : ''}
  ${({ paddingBottom }) => paddingBottom ? `padding-bottom: ${paddingBottom}em;` : ''}
  ${({ paddingLeft }) => paddingLeft ? `padding-left: ${paddingLeft}em;` : ''}
  ${({ paddingRight }) => paddingRight ? `padding-right: ${paddingRight}em;` : ''}
`

type Props = StyledContainerProps & {
  gap?: number
  children?: React.ReactNode
}

const Container = (props: Props) => {
  const {
    height = 'inherit',
    width = 'inherit',
    borderRadius,
    background,
    flexDirection = 'row',
    justifyContent = 'flex-start',
    alignItems = 'flex-start',
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    gap,
    children
  } = props

  if (typeof gap !== 'undefined' && gap > 0) {
    const {
      gap,
      padding,
      paddingLeft,
      paddingTop,
      paddingRight,
      paddingBottom,
      width,
      ...childrensProps
    } = props
    const parentProps = { padding, paddingLeft, paddingTop, paddingRight, paddingBottom, width }

    return (
      <StyledConainer {...childrensProps} {...parentProps}>
        {React.Children.toArray(children).map((child, index) => {
          if (index !== React.Children.toArray(children).length - 1) {
            return (
              <StyledConainer
                key={index}
                paddingRight={flexDirection === 'row' && gap}
                paddingBottom={flexDirection === 'column' && gap}
                {...childrensProps}
              >
                {child}
              </StyledConainer>
            )
          }

          return (
            <StyledConainer key={index} {...childrensProps}>
              {child}
            </StyledConainer>
          )
        })}
      </StyledConainer>
    )
  }

  return (
    <StyledConainer
      height={height}
      width={width}
      background={background}
      borderRadius={borderRadius}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
      padding={padding}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
    >
      {children}
    </StyledConainer>
  )
}

export default Container
