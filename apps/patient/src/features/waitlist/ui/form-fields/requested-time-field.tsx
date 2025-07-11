import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, TimeInput } from '@/components-v2'
import { WaitlistSchemaType } from '../waitlist-form'

const RequestedTimeField = () => {
  const form = useFormContext<WaitlistSchemaType>()

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel>Requested Time</FormFieldLabel>
      <Flex gap="1">
        <FormFieldContainer className="w-full">
          <Flex align="center" className="w-full">
            <FormFieldLabel>From</FormFieldLabel>
            <Box className="w-full">
              <TimeInput
                field="fromTime"
                showIcon
                showError
                isDisabled={
                  !form.watch('serviceOffered') || !form.watch('fromDate')
                }
                dateInputClass="h-[40px] rounded-6"
              />
            </Box>
          </Flex>
        </FormFieldContainer>

        <FormFieldContainer className="w-full">
          <Flex className="w-full" align="center">
            <FormFieldLabel>To</FormFieldLabel>
            <Box className="w-full">
              <TimeInput
                field="toTime"
                showIcon
                showError
                isDisabled={
                  !form.watch('serviceOffered') || !form.watch('fromDate')
                }
                dateInputClass="h-[40px] rounded-6"
              />
            </Box>
          </Flex>
        </FormFieldContainer>
      </Flex>
    </FormFieldContainer>
  )
}

export { RequestedTimeField }
