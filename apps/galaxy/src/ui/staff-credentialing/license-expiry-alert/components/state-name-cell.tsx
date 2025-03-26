'use client'

import { TextCell, type PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName } from '@/utils'
import { GetLicensesResponse } from '../../types'

const StateNameCell = ({
  row: { original: record },
}: PropsWithRow<GetLicensesResponse>) => {
  const codes = useCodesetCodes(CODESETS.UsStates)
  return (
    <TextCell className="pl-1">
      {getCodesetDisplayName(record.stateCode, codes)}
    </TextCell>
  )
}

export { StateNameCell }
