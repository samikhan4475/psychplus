'use client'

import { ComponentProps } from 'react'
import { Flex, IconButton } from '@radix-ui/themes'
import { cn } from '@/utils'

type IconButtonProps = Omit<ComponentProps<typeof IconButton>, 'size' | 'type'>
interface CountIndicatorProps extends IconButtonProps {
  count?: number
  maxCount?: number
}

const CountIndicator = ({
  count = 0,
  maxCount = 99,
  children,
  color = 'red',
  className,
  ...rest
}: CountIndicatorProps) => {
  return (
    <Flex align="start">
      {children}
      <IconButton
        color={color}
        size="1"
        tabIndex={-1}
        type="button"
        className={cn(
          'rounded-full pointer-events-none -ml-1.5 -mt-1.5 h-fit max-h-3.5 w-fit px-1 py-0 text-[10px] font-medium',
          className,
        )}
        {...rest}
      >
        {count > maxCount ? `${maxCount}+` : count}
      </IconButton>
    </Flex>
  )
}

export { CountIndicator }
