import { useRef } from 'react'
import { Box, Checkbox, TextField } from '@radix-ui/themes'
import { IndeterminateCheckboxProps } from '../types'

const IndeterminateCheckbox = ({
  isHeaderCheckBox,
  checked,
  indeterminate,
  disabled,
  onClick,
}: IndeterminateCheckboxProps) => {
  let headerText = null

  if (isHeaderCheckBox) {
    headerText = checked ? 'Yes' : 'No'
  }
  return (
    <Box className="flex gap-2">
      <Checkbox
        onClick={onClick}
        disabled={disabled}
        {...(indeterminate ? { indeterminate: true } : {})}
      />
      {headerText && <span>{headerText}</span>}
    </Box>
  )
}

export { IndeterminateCheckbox }
