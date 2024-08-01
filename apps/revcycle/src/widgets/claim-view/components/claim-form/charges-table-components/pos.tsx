import { Select } from '@psychplus/ui/select'
import { Charge } from '../types'

interface TableCellProps {
  row: {
    original: Charge
  }
}

const TableCellPOS = ({ row: { original: chargeRecord } }: TableCellProps) => {
  return (
    <Select.Root size="1" defaultValue="01">
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Item value="01">01-School</Select.Item>
          <Select.Item value="02">02-School</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export { TableCellPOS }
