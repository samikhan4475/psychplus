'use client'

import React from 'react'
import { Flex } from '@radix-ui/themes'
import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { SchedulingHistoryData } from '../types'

const VisitTypeCell = ({ row }: PropsWithRow<SchedulingHistoryData>) => {
  const { visitTypeCode, visitSequenceType, visitMedium } = row.original
  const vistTypeCodeOptons = useCodesetOptions(CODESETS.VisitType)
  const vistTypeCode = vistTypeCodeOptons?.find(
    (item) => item?.value === visitTypeCode,
  )

  return (
    <Flex align="center" gap="1" p="1">
      <TextCell className="capitalize">{`${vistTypeCode?.label}, ${visitSequenceType}, ${visitMedium}`}</TextCell>
    </Flex>
  )
}

export { VisitTypeCell }
