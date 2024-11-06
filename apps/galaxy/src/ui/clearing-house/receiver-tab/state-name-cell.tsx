'use client'

import { Text } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { ClearingHouseReceiver } from '@/types'
import { getStateDisplayName } from '../utils'

const StateNameCell = ({
  row: { original: record },
}: PropsWithRow<ClearingHouseReceiver>) => {
  const codes = useCodesetCodes(CODESETS.UsStates)

  return <Text>{getStateDisplayName(codes, record.state)}</Text>
}

export { StateNameCell }
