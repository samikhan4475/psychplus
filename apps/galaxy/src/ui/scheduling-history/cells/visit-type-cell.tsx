'use client'

import React from 'react'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import { PropsWithRow, TextCell } from '@/components'
import { SchedulingHistoryData } from '../types'

const VisitTypeCell = ({ row }: PropsWithRow<SchedulingHistoryData>) => {
  return (
    <Flex align="center" gap="1" p="1">
      <TextCell>{`${row.original.visitTypeCode} ${row.original.visitSequenceType}  ${row.original.visitMedium}`}</TextCell>
    </Flex>
  )
}

export { VisitTypeCell }
