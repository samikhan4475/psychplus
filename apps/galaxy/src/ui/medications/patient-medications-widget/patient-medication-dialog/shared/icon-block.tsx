'use client'

import React, { ReactNode } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface IconBlockProps {
  title: string
  icon?: ReactNode
  className?: string
  textClassName?: string
}
const IconBlock = ({
  title,
  className,
  icon,
  textClassName = 'text-1',
}: IconBlockProps) => {
  return (
    <Flex
      className={cn(
        'bg-pp-bg-table-cell border-pp-focus-bg rounded-3 border p-2',
        className,
      )}
      align="center"
      gap="3"
    >
      {icon}
      <Text className={textClassName} weight="regular">
        {title}
      </Text>
    </Flex>
  )
}

export { IconBlock }
