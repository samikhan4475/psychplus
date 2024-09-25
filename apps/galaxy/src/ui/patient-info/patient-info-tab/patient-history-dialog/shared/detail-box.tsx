'use client'

import { Flex, Heading, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface DetailBoxProps {
  required?: boolean
  title: string
  content?: string
  className?: string
}
const DetailBox = ({ title, content, required, className }: DetailBoxProps) => {
  return (
    <Flex className={cn('w-fit', className)} gap="1" direction="column">
      <Flex align="center" gap="1">
        <Heading size="1" weight="medium" className="text-pp-black-3">
          {title}
        </Heading>
        {required && (
          <Text size="1" color="red" weight="bold">
            *
          </Text>
        )}
      </Flex>
      <Text size="1" className="text-pp-black-3" weight="regular">
        {content}
      </Text>
    </Flex>
  )
}

export { DetailBox }
