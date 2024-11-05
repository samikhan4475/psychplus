'use client'

import { Text } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { ClearingHouseSubmitter } from '../types'
import { getStateDisplayName } from '../utils'

const StateNameCell = ({
  row: { original: record },
}: PropsWithRow<ClearingHouseSubmitter>) => {
  const codes = useCodesetCodes(CODESETS.UsStates)

  return record.state ? (
    <Text>{getStateDisplayName(codes, record.state)}</Text>
  ) : null
}

export { StateNameCell }
