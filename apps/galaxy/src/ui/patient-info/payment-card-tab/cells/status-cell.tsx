'use client'

import { Badge, Flex } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { CreditCard } from '../types'

const StatusCell = ({ row: { original } }: PropsWithRow<CreditCard>) => {
  return (
    <Flex className="px-0.5" width={'100%'} height={'100%'} align={'center'}>
      <Badge
        color={original?.isActive ? 'green' : 'red'}
        size={'1'}
        className="rounded-1 font-regular"
      >
        {original?.isActive ? 'Active' : 'Expire'}
      </Badge>
    </Flex>
  )
}

export { StatusCell }
