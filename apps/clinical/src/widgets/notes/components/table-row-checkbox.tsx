import { Box, Checkbox } from '@radix-ui/themes'

interface RowCheckboxProps {
  checked: boolean
  onCheckedChange: (val: boolean) => void
}

const TableRowCheckbox = ({ checked, onCheckedChange }: RowCheckboxProps) => {
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Checkbox
        checked={checked}
        className="mt-0.5"
        onCheckedChange={(val) => onCheckedChange(!!val)}
        color="indigo"
        highContrast
      />
    </Box>
  )
}

export { TableRowCheckbox }
