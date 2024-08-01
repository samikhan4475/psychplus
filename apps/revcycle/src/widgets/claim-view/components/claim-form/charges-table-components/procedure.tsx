import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { TextField } from '@psychplus/ui/text-field'
import { Charge } from '../types'

interface TableCellProps {
  row: {
    original: Charge
  }
}

const TableCellProcedure = ({
  row: { original: chargeRecord },
}: TableCellProps) => {
  return (
    <TextField.Root size="1">
      <TextField.Input placeholder="Search" />
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  )
}

export { TableCellProcedure }
