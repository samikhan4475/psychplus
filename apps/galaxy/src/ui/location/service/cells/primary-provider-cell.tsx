'use client'

import { LongTextCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Service } from '@/types'
import { getCodesetDisplayName } from '@/utils'

const PrimaryProviderCell = ({ row: { original } }: PropsWithRow<Service>) => {
  const codes = useCodesetCodes(CODESETS.ProviderType)
  return (
    <LongTextCell>
      {getCodesetDisplayName(original?.primaryProviderType, codes) ?? 'N/A'}
    </LongTextCell>
  )
}

export { PrimaryProviderCell }
