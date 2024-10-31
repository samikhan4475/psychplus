import React from 'react'
import { Flex, Text } from '@radix-ui/themes'

interface ClaimSummaryCardProps {
  label: string
  value?: number
}
const ClaimSummaryCard = ({ label, value }: ClaimSummaryCardProps) => (
  <Flex
    direction="column"
    className="w-[130px] rounded-2 border border-gray-5 bg-gray-3"
    p="3"
  >
    <Text size="1" weight="medium">
      {label}
    </Text>
    <Text size="1">${value ? value.toFixed(2) : '0.00'}</Text>
  </Flex>
)

export { ClaimSummaryCard }
