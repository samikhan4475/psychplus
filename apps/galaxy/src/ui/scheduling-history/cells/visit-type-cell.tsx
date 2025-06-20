'use client'

import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { VisitSequenceTypes } from '@/types'
import { getCodesetDisplayName } from '@/utils'
import { SchedulingHistoryData } from '../types'

const VisitTypeCell = ({ row }: PropsWithRow<SchedulingHistoryData>) => {
  const { visitTypeCode, visitSequenceType, visitMedium } = row.original
  const visitTypeCodes = useCodesetCodes(CODESETS.VisitType)
  const sequenceCodes = useCodesetCodes(CODESETS.VisitSequence)
  const mediumCodes = useCodesetCodes(CODESETS.VisitMedium)

  const visitType = getCodesetDisplayName(visitTypeCode, visitTypeCodes)
  const sequence = getCodesetDisplayName(visitSequenceType, sequenceCodes)
  const medium = getCodesetDisplayName(visitMedium, mediumCodes)

  return (
    <TextCell className="truncate capitalize" wrapperClass="w-full">
      {visitSequenceType === VisitSequenceTypes.Na
        ? `${visitType}, ${visitMedium}`
        : `${visitType}, ${sequence}, ${medium}`}
    </TextCell>
  )
}

export { VisitTypeCell }
