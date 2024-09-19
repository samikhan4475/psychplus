'use client'

import { useMemo } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DatePickerInput, SelectInput } from '@/components'
import { FormFieldError, FormFieldLabel } from '@/components/form'
import { SchemaType } from '../../schema'
import { generateTimeIntervals } from '../../util'

const DateTimeOfAdmission = () => {
  const form = useFormContext<SchemaType>()

  const facilityAdmissionId = form.watch('facilityAdmissionId')
  const nonTimeProviderType = form.watch('nonTimeProviderType')

  const timeSlots = useMemo(() => generateTimeIntervals(), [])

  const isDisabled = !facilityAdmissionId && !nonTimeProviderType

  const options = timeSlots.map((v) => ({
    label: v.label,
    value: v.value,
  }))

  return (
    <Box className="flex-1">
      <Flex direction={'column'} className="flex-1 gap-[2px]">
        <FormFieldLabel required>Date/Time of Admission</FormFieldLabel>
        <Box className="appointment-date-time grid grid-cols-5 gap-3">
          <DatePickerInput
            field="dateOfAdmission"
            isDisabled={isDisabled}
            dateInputClass="h-[21px]"
          />
          <Box className="flex-1">
            <SelectInput
              field="timeOfAdmission"
              options={options}
              buttonClassName="flex-1"
              disabled={isDisabled}
            />
            <FormFieldError name="timeOfAdmission" />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export { DateTimeOfAdmission }
