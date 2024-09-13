'use client'

import { Flex } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { Relationship } from '@/types'

const ActionsCell = ({ row }: PropsWithRow<Relationship>) => {
  return (
    <Flex width={'100%'} justify={'center'}>
      <Trash2 width={16} height={16} className="text-pp-gray-1" />
    </Flex>
  )
}
export { ActionsCell }
