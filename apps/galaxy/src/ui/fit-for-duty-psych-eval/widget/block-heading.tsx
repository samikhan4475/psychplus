'use client'

import { PropsWithChildren } from 'react'
import { Flex, Text } from '@radix-ui/themes'

interface Props {
  title?: string
}

const BlockHeading = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <Flex direction="column" gap="2">
      <Text weight="medium" size="3">
        {title}
      </Text>
      {children}
    </Flex>
  )
}

export { BlockHeading }
