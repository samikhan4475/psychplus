'use client'

import { Box, Flex } from '@radix-ui/themes'
import { DatePickerInput, FormFieldLabel } from '@/components'

interface DateFromInputProps {
  disabled?: boolean
}

const DateToInput = ({ disabled }: DateFromInputProps) => {
  return (
    <Flex align="center" gap="1">
      <FormFieldLabel className="!text-1">To</FormFieldLabel>
      <Box className="w-[103px]">
        <DatePickerInput
          field="endDate"
          aria-label="date-to-filter-input"
          isDisabled={disabled}
        />
      </Box>
    </Flex>
  )
}

export { DateToInput }
