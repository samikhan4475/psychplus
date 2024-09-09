import { DropdownMenu } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { CreditCard } from '../types'

const RowActionDelete = ({ row: { original } }: PropsWithRow<CreditCard>) => {
  return (
    <DropdownMenu.Item
      onClick={() => {
        console.log('details:', original)
      }}
      className="hover:!text-black hover:!bg-pp-gray-2 h-7"
    >
      <Trash2 size={14} /> Delete
    </DropdownMenu.Item>
  )
}

export { RowActionDelete }
