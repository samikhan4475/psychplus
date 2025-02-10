'use client'

import React from 'react'
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
    <TextCell
      className="truncate capitalize"
      wrapperClass="w-full"
    >{`${vistTypeCode?.label}, ${visitSequenceType}, ${visitMedium}`}</TextCell>
  )
}

export { VisitTypeCell }
