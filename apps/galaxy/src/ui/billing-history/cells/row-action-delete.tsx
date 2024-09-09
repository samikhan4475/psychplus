import { DropdownMenu } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { type PropsWithRow } from '@/components'
import type { BillingHistory } from '../types'

const RowActionDelete = ({
  row: { original: billingHistory },
}: PropsWithRow<BillingHistory>) => {
  return (
    <DropdownMenu.Item
      onClick={() => {
        console.log('edit:', billingHistory)
      }}
    >
      <Trash2 height={12} width={12} />
      Delete
    </DropdownMenu.Item>
  )
}

export { RowActionDelete }
