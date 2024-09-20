'use client'

import { Flex } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { CreditCard } from '../types'

const ActionsCell = ({ row }: PropsWithRow<CreditCard>) => {
  return (
    <Flex justify="start" px="1" align="center" width="100%" height="100%">
      <Trash2 className="text-black cursor-pointer" size={16} />
    </Flex>
  )
}

export { ActionsCell }
