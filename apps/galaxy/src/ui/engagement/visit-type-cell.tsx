import React from 'react'
import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { WaitlistResponse } from '@/types'
import { getCodesetDisplayName } from '@/utils'

const VisitTypeCell = ({
  row: { original },
}: PropsWithRow<WaitlistResponse>) => {
  const sequenceCcodes = useCodesetCodes(CODESETS.VisitSequence)
  const mediumCcodes = useCodesetCodes(CODESETS.VisitMedium)

  const sequence = getCodesetDisplayName(
    original?.visitSequence,
    sequenceCcodes,
  )
  const medium = getCodesetDisplayName(original?.visitMedium, mediumCcodes)

  return (
    <TextCell>{`${original?.visitType} | ${sequence} | ${medium}`}</TextCell>
  )
}

export default VisitTypeCell
