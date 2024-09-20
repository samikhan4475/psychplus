'use client'

import { Flex } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { StaffCommentsBilling } from '@/ui/patient-info/payment-history-tab/types'

const ActionCell = ({ row }: PropsWithRow<StaffCommentsBilling>) => {
  return (
    <Flex justify="center" align="center" width="100%" height="100%">
      <Trash2 className="text-black cursor-pointer" size={16} />
    </Flex>
  )
}

export { ActionCell }
