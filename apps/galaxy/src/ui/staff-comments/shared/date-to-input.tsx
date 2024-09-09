'use client'

import { Box, Flex } from '@radix-ui/themes'
import { DatePickerInput, FormFieldLabel } from '@/components'

const DateToInput = () => {
  return (
    <Flex align="center" gap="1">
      <FormFieldLabel className="!text-1">To</FormFieldLabel>
      <Box className="w-[103px]">
        <DatePickerInput field="dateFrom" aria-label="date-to-filter-input" />
      </Box>
    </Flex>
  )
}

export { DateToInput }
