'use client'

import { Flex, Heading, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface DetailBoxProps {
  required?: boolean
  className?: string
  title: string
  content?: string
}
const DetailBox = ({ title, content, className, required }: DetailBoxProps) => {
  return (
    <Flex className={cn(className)} gap="1" direction="column">
      <Flex align="center" className="h-[18px]" gap="2" width="100%">
        <Heading size="1">
          {title}
          {required && (
            <Text size="1" color="red">
              *
            </Text>
          )}
        </Heading>
      </Flex>
      <Text size="1" className="text-pp-black-3">
        {content}
      </Text>
    </Flex>
  )
}

export { DetailBox }
