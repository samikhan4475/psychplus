'use client'

import { Badge } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { CreditCard } from '@/types'

const StatusCell = ({ row: { original } }: PropsWithRow<CreditCard>) => {
  return (
    <Badge
      color={original?.isActive ? 'green' : 'red'}
      size="1"
      className="rounded-1 font-regular"
    >
      {original?.isActive ? 'Active' : 'Expire'}
    </Badge>
  )
}

export { StatusCell }
