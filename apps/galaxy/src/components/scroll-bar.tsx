'use client'

import React from 'react'
import { Flex, FlexProps } from '@radix-ui/themes'
import { cn } from '@/utils'

export type ScrollBarProps = FlexProps & {
  children: React.ReactNode
  className?: string
}

const ScrollBar = ({ children, className = '', ...rest }: ScrollBarProps) => {
  return (
    <Flex
      className={cn(
        'scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent overflow-x-scroll',
        className
      )}
      style={{ scrollbarGutter: 'stable', ...rest.style }}
      {...rest}
    >
      {children}
    </Flex>
  )
}

export { ScrollBar }
