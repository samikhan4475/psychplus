import { DropdownMenu } from '@radix-ui/themes'
import { Pencil } from 'lucide-react'
import { type PropsWithRow } from '@/components'
import type { PaymentHistory } from '../types'

const RowActionEdit = ({
  row: { original: PaymentHistory },
}: PropsWithRow<PaymentHistory>) => {
  return (
    <DropdownMenu.Item
      onClick={() => {
        console.log('edit:', PaymentHistory)
      }}
    >
      <Pencil height={12} width={12} />
      Edit
    </DropdownMenu.Item>
  )
}

export { RowActionEdit }
