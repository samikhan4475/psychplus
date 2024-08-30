import { TextField } from '@radix-ui/themes'
import { ClaimServiceLine } from '../types'

interface TableCellProps {
  row: {
    original: ClaimServiceLine
  }
}

const TableCellEndTime = ({row: { original: chargeRecord },}: TableCellProps) => {
  return (
    <TextField.Root
      type="time"
      className="h-[22px]"
      placeholder="Select time"
    />
  )
}

export { TableCellEndTime }
