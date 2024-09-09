'use client'

import { Box, Flex } from '@radix-ui/themes'
import { DatePickerInput, FormFieldLabel } from '@/components'

const DateFromInput = () => {
  return (
    <Flex align="center" gap="1">
      <FormFieldLabel className="!text-1">From</FormFieldLabel>
      <Box className="w-[103px]">
        <DatePickerInput field="dateTo" aria-label="date-from-filter-input" />
      </Box>
    </Flex>
  )
}

export { DateFromInput }
