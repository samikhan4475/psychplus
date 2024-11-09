'use client'

import React from 'react'
import { Badge, Flex } from '@radix-ui/themes'
import { PropsWithRow, TextCell } from '@/components'
import { CreditCard } from '@/types'

const CardTypeCell = ({
  row: {
    original: { isPrimary, isActive, cardType },
  },
}: PropsWithRow<CreditCard>) => {
  return (
    <Flex className="gap-x-2 pr-1" align="center">
      <TextCell className="!text-1">{cardType}</TextCell>
      {isPrimary && isActive && (
        <Badge
          color="yellow"
          variant="surface"
          className="rounded-1 font-regular"
          size="1"
        >
          Primary
        </Badge>
      )}
    </Flex>
  )
}

export { CardTypeCell }
