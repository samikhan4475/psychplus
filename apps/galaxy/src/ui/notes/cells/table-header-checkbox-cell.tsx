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
  const { selectedRow, setSelectedRow } = useStore((state) => ({
    selectedRow: state.selectedRow,
    setSelectedRow: state.setSelectedRow,
  }))

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Checkbox
        checked={checked}
        className="mt-0.5"
        color="indigo"
        highContrast
        onCheckedChange={(value) => {
          if (selectedRow && !value) {
            setSelectedRow(undefined)
          }
          onCheckedChange(!!value)
        }}
        aria-label="Select all"
      />
    </Box>
  )
}

export { TableHeaderCheckboxCell }
