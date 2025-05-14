import React from 'react'
import { Box } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, TimeInput } from '@/components'

const RequestedTimeField = () => {
  const form = useFormContext()

  return (
    <FormFieldContainer className="flex-col gap-1">
      <FormFieldLabel>Requested Time</FormFieldLabel>
      <Box className="flex gap-1">
        <Box className="flex gap-1">
          <FormFieldLabel>From</FormFieldLabel>
          <TimeInput
            field="fromTime"
            dateInputClass="h-6"
            className="w-[70px]"
            showError={true}
            isDisabled={!form.watch('visitTypeCode') || !form.watch('fromDate')}
          />
        </Box>
        <Box className="flex gap-1">
          <FormFieldLabel>To</FormFieldLabel>
          <TimeInput
            field="toTime"
            dateInputClass="h-6"
            className="w-[70px]"
            showError={true}
            isDisabled={!form.watch('visitTypeCode') || !form.watch('fromDate')}
          />
        </Box>
      </Box>
    </FormFieldContainer>
  )
}

export { RequestedTimeField }
