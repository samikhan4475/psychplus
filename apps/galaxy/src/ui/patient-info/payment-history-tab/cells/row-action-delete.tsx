import { DropdownMenu } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { type PropsWithRow } from '@/components'
import type { PaymentHistory } from '../types'

const RowActionDelete = ({
  row: { original: PaymentHistory },
}: PropsWithRow<PaymentHistory>) => {
  return (
    <DropdownMenu.Item
      onClick={() => {
        console.log('edit:', PaymentHistory)
      }}
    >
      <Trash2 height={12} width={12} />
      Delete
    </DropdownMenu.Item>
  )
}

export { RowActionDelete }
