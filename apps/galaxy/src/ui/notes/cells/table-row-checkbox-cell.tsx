import { Box, Checkbox } from '@radix-ui/themes'
import { useStore } from '../store'

interface RowCheckboxProps {
  checked: boolean
  onCheckedChange: (val: boolean) => void
}

const TableRowCheckboxCell = ({
  checked,
  onCheckedChange,
}: RowCheckboxProps) => {
  const { selectedRow, setSelectedRow } = useStore((state) => ({
    selectedRow: state.selectedRow,
    setSelectedRow: state.setSelectedRow,
  }))

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Checkbox
        checked={checked}
        className="mt-0.5"
        onCheckedChange={(val) => {
          if (selectedRow && !val) {
            setSelectedRow(undefined)
          }
          onCheckedChange(!!val)
        }}
        color="indigo"
        highContrast
      />
    </Box>
  )
}

export { TableRowCheckboxCell }
