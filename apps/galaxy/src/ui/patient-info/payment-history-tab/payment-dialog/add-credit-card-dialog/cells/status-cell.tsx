'use client'

import { Badge } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { CreditCard } from '@/types'

const StatusCell = ({
  row: {
    original: { isActive },
  },
}: PropsWithRow<CreditCard>) => {
  return (
    <Badge
      color={isActive ? 'green' : 'red'}
      size="1"
      className="rounded-1 font-regular"
    >
      {isActive ? 'Active' : 'Inactive'}
    </Badge>
  )
}

export { StatusCell }
