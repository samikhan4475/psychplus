'use client'

import { TextCell, type PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName } from '@/utils'
import { License } from '../types'

const StateNameCell = ({
  row: { original: record },
}: PropsWithRow<License>) => {
  const codes = useCodesetCodes(CODESETS.UsStates)

  return (
    <TextCell className="pl-1">
      {getCodesetDisplayName(record.stateCode, codes)}
    </TextCell>
  )
}

export { StateNameCell }
