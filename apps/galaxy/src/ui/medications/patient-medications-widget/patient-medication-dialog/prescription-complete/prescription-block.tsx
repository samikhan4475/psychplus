'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { getDateTimeString } from '@/ui/schedule/utils'
import { formatDateTime } from '@/utils'

interface PrescriptionBlockProps {
  transactionId: string
  transactionDate: string
}
const PrescriptionBlock = ({
  transactionId,
  transactionDate,
}: PrescriptionBlockProps) => {
  return (
    <Flex className="gap-2.5">
      <Flex
        gap="1"
        className="border-pp-focus-bg flex-1 rounded-3 border p-2"
        direction="column"
      >
        <Text size="2" weight="medium">
          Transmission ID
        </Text>
        <Text size="2" className="text-pp-gray-1">
          {transactionId}
        </Text>
      </Flex>
      <Flex
        gap="1"
        direction="column"
        className="border-pp-focus-bg flex-1 rounded-3 border p-2"
      >
        <Text size="2" weight="medium">
          Date/Time
        </Text>
        <Text size="2" className="text-pp-gray-1">
          {formatDateTime(transactionDate)}
        </Text>
      </Flex>
    </Flex>
  )
}

export { PrescriptionBlock }
