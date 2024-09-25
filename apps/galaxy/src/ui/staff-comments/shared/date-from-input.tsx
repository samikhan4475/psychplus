'use client'

import { Box, Flex } from '@radix-ui/themes'
import { DatePickerInput, FormFieldLabel } from '@/components'

interface DateFromInputProps {
  disabled?: boolean
}
const DateFromInput = ({ disabled }: DateFromInputProps) => {
  return (
    <Flex align="center" gap="1">
      <FormFieldLabel className="!text-1">From</FormFieldLabel>
      <Box className="w-[103px]">
        <DatePickerInput
          field="startDate"
          aria-label="date-from-filter-input"
          isDisabled={disabled}
        />
      </Box>
    </Flex>
  )
}

export { DateFromInput }
