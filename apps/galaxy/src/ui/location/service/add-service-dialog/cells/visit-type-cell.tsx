'use client'

import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Encounter } from '@/types'
import { getCodesetDisplayName } from '@/utils'

const VisitTypeCell = ({ row: { original } }: PropsWithRow<Encounter>) => {
  const sequenceCodes = useCodesetCodes(CODESETS.VisitSequence)
  const mediumCodes = useCodesetCodes(CODESETS.VisitMedium)
  const sequence = getCodesetDisplayName(original?.visitSequence, sequenceCodes)
  const medium = getCodesetDisplayName(original?.visitMedium, mediumCodes)
  return (
    <TextCell>{`${original?.typeOfVisit} - ${sequence} - ${medium}`}</TextCell>
  )
}

export { VisitTypeCell }
