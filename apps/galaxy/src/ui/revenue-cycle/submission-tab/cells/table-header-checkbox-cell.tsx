import { Box, Checkbox } from '@radix-ui/themes'
import { useStore } from '../store'
interface HeaderCheckboxProps {
  checked: boolean
  onCheckedChange: (value: boolean) => void
}
const TableHeaderCheckboxCell = ({
  checked,
  onCheckedChange,
}: HeaderCheckboxProps) => {
  const { selectedRows, setSelectedRows } = useStore((state) => ({
    selectedRows: state.selectedRows,
    setSelectedRows: state.setSelectedRows,
  }))
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Checkbox
        checked={checked}
        className="ml-[4.5px] mt-0.5"
        color="indigo"
        highContrast
        onCheckedChange={(value) => {
          if (selectedRows.length > 0 && !value) {
            setSelectedRows([])
          }
          onCheckedChange(!!value)
        }}
        aria-label="Select all"
      />
    </Box>
  )
}
export { TableHeaderCheckboxCell }
