'use client'

import { IconButton } from '@radix-ui/themes'
import { Pencil } from 'lucide-react'
import { type PropsWithRow } from '@/components'
import type { PatientTransaction } from '../types'

const RowActionEdit = ({
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
      <Pencil height={12} width={12} />
    </IconButton>
  )
}

export { RowActionEdit }
