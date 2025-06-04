'use client'

import { TextCell, type PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName } from '@/utils'
import { Patient } from '../types'

const StateNameCell = ({
  row: { original: record },
}: PropsWithRow<Patient>) => {
  const codes = useCodesetCodes(CODESETS.UsStates)
  let state = record.patientState ?? ''
  if (state?.length < 3) {
    state = getCodesetDisplayName(state, codes)
  }
  return <TextCell className="pl-1">{state}</TextCell>
}

export { StateNameCell }
