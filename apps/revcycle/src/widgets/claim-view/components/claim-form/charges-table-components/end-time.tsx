import { TextField } from '@radix-ui/themes'
import { Charge } from '../types'

interface TableCellProps {
  row: {
    original: Charge
  }
}

const TableCellEndTime = ({
  row: { original: chargeRecord },
}: TableCellProps) => {
  return (
    <TextField.Root>
      <TextField.Input
        type="time"
        className="h-[22px]"
        placeholder="Select time"
      />
    </TextField.Root>
  )
}

export { TableCellEndTime }
