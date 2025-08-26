'use client'

import { Box, Checkbox } from '@radix-ui/themes'

interface RowCheckboxProps {
  checked: boolean
  onCheckedChange: (val: boolean) => void
  medicationId: string
}

const TableRowCheckboxCell = ({
  checked,
  onCheckedChange,
  medicationId,
}: RowCheckboxProps) => {
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Checkbox
        checked={checked}
        className="mt-0.5"
        onCheckedChange={(v) => onCheckedChange(v === true)}
        color="indigo"
        highContrast
        data-medication-id={medicationId}
      />
    </Box>
  )
}

export { TableRowCheckboxCell }
