'use client'

import React from 'react'
import { cn } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'

interface FilterItemProps {
  label: string
  children: React.ReactNode
  className?: string
}

export const FilterItem = ({ label, children, className }: FilterItemProps) => {
  return (
    <Flex
      gap="2"
      align="center"
      direction="column"
      className={cn(
        'text-pp-text-color h-[60px] w-[200px] min-w-[120px]',
        className,
      )}
    >
      <Flex className="h-[20px] w-full justify-start">
        <Text className="text-[12px] font-medium lg:text-[14px]">{label}</Text>
      </Flex>
      {children}
    </Flex>
  )
}
