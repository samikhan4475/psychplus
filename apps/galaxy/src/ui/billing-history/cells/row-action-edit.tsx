import { DropdownMenu } from '@radix-ui/themes'
import { Pencil } from 'lucide-react'
import { type PropsWithRow } from '@/components'
import type { BillingHistory } from '../types'

const RowActionEdit = ({
  row: { original: billingHistory },
}: PropsWithRow<BillingHistory>) => {
  return (
    <DropdownMenu.Item
      onClick={() => {
        console.log('edit:', billingHistory)
      }}
    >
      <Pencil height={12} width={12} />
      Edit
    </DropdownMenu.Item>
  )
}

export { RowActionEdit }
