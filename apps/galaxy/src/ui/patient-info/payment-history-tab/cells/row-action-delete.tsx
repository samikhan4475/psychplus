'use client'

import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { type PropsWithRow } from '@/components'
import type { PatientTransaction } from '../types'

const RowActionDelete = ({
  row: { original: PaymentHistory },
}: PropsWithRow<PatientTransaction>) => {
  return (
    <IconButton
      onClick={() => {
        console.log('edit:', PaymentHistory)
      }}
      size="1"
      variant="ghost"
      color="gray"
      className="text-black disabled:text-pp-gray-3"
    >
      <Trash2 height={12} width={12} />
    </IconButton>
  )
}

export { RowActionDelete }
