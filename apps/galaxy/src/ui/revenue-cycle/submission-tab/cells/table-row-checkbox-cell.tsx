import { Box, Checkbox } from '@radix-ui/themes'
import { useStore } from '../store'
interface RowCheckboxProps {
  checked: boolean
  onCheckedChange: (val: boolean) => void
  claimId: string
}
const TableRowCheckboxCell = ({
  checked,
  onCheckedChange,
  claimId
}: RowCheckboxProps) => {
  const { selectedRows, setSelectedRows } = useStore((state) => ({
    selectedRows: state.selectedRows,
    setSelectedRows: state.setSelectedRows,
  }))
  const toggleSelected = async (value: boolean) => {
    onCheckedChange(value)
    const selectedClaims = value
      ? [...selectedRows, claimId]
      : selectedRows.filter((id) => id !== claimId)
    setSelectedRows(selectedClaims)
  }
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Checkbox
        checked={checked}
        className="mt-0.5"
        onCheckedChange={(value) => toggleSelected(!!value)}
        color="indigo"
        highContrast
      />
    </Box>
  )
}
export { TableRowCheckboxCell }
