'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow, TextCell } from '@/components'
import { SchedulingHistoryData } from '../types'

const VisitIDCell = ({ row }: PropsWithRow<SchedulingHistoryData>) => {
  return (
    <Flex align="center" gap="1" p="1" >
      <TextCell className="truncate" wrapperClass="w-full">
        {row.original.visitId}
      </TextCell>
    </Flex>
  )
}

export { VisitIDCell }
