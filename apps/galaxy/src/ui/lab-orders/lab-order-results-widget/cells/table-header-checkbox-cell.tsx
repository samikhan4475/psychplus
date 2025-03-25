import { Box, Checkbox, Flex } from '@radix-ui/themes'
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
      <Flex className="w-full px-1">
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
      </Flex>
    </Box>
  )
}

export { TableHeaderCheckboxCell }
