'use client'

import { Box, Flex } from '@radix-ui/themes'
import { DatePickerInput, FormFieldLabel } from '@/components'

interface EndDateInput {
  disabled: boolean
}
const EndDateInput = ({ disabled }: EndDateInput) => {
  return (
    <Flex align="center" gap="1">
      <FormFieldLabel className="!text-1">End Date</FormFieldLabel>
      <Box className="w-[103px]">
        <DatePickerInput field="endDate" isDisabled={disabled} />
      </Box>
    </Flex>
  )
}

export { EndDateInput }
