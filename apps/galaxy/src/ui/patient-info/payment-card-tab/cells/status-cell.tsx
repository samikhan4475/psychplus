'use client'

import { Badge } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { CreditCard } from '@/types'
import { getCodesetDisplayName } from '@/utils'

const StatusCell = ({ row: { original } }: PropsWithRow<CreditCard>) => {
  const codes = useCodesetCodes(CODESETS.CreditCardStatus)

  return (
    <Badge
      color={original?.cardStatus === 'Active' ? 'green' : 'red'}
      size="1"
      className="rounded-1 font-regular"
    >
      {original?.cardStatus
        ? getCodesetDisplayName(original.cardStatus, codes)
        : 'N/A'}
    </Badge>
  )
}

export { StatusCell }
