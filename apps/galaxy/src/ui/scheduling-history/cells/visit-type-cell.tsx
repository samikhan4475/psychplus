'use client'

import React from 'react'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import { PropsWithRow, TextCell } from '@/components'
import { SchedulingHistory } from '../types'

const VisitTypeCell = ({ row }: PropsWithRow<SchedulingHistory>) => {
  return (
    <Flex align="center" gap="1" p="1">
      <CounterClockwiseClockIcon className="text-black" />
      <TextCell>{row?.original?.visitStatus}</TextCell>
    </Flex>
  )
}

export { VisitTypeCell }
