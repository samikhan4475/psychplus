'use client'

import { Box, Flex } from '@radix-ui/themes'
import { DatePickerInput, FormFieldLabel } from '@/components'

interface StartDateInput {
  disabled: boolean
}
const StartDateInput = ({ disabled }: StartDateInput) => {
  return (
    <Flex align="center" gap="1">
      <FormFieldLabel className="!text-1">From Date</FormFieldLabel>
      <Box className="w-[103px]">
        <DatePickerInput field="fromDate" isDisabled={disabled} />
      </Box>
    </Flex>
  )
}

export { StartDateInput }
