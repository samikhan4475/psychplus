import { Box, Checkbox } from '@radix-ui/themes'

interface HeaderCheckboxProps {
  checked: boolean
  onCheckedChange: (value: boolean) => void
}

const TableHeaderCheckbox = ({
  checked,
  onCheckedChange,
}: HeaderCheckboxProps) => {
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Checkbox
        checked={checked}
        className="mt-0.5"
        color="indigo"
        highContrast
        onCheckedChange={(value) => {
          onCheckedChange(!!value)
        }}
        aria-label="Select all"
      />
    </Box>
  )
}

export { TableHeaderCheckbox }
