'use client'

import { LongTextCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Service } from '@/types'
import { getCodesetDisplayName } from '@/utils'

const StateCell = ({ row: { original } }: PropsWithRow<Service>) => {
  const codes = useCodesetCodes(CODESETS.UsStates)
  return (
    <LongTextCell className="min-w-24 max-w-32">
      {getCodesetDisplayName(original?.address?.state ?? '', codes) ?? 'N/A'}
    </LongTextCell>
  )
}

export { StateCell }
