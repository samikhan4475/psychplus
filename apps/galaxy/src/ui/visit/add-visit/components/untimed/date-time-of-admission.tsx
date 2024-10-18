'use client'

import { useMemo } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { DatePickerInput, SelectInput } from '@/components'
import { FormFieldError, FormFieldLabel } from '@/components/form'
import { SchemaType } from '../../schema'
import { generateTimeIntervals } from '../../util'

const DateTimeOfAdmission = () => {
  const form = useFormContext<SchemaType>()

  const [facilityAdmissionId, providerType] = useWatch({
    control: form.control,
    name: ['facilityAdmissionId', 'providerType'],
  })

  const timeSlots = useMemo(() => generateTimeIntervals(), [])

  const isDisabled = !facilityAdmissionId && !providerType

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
            dateInputClass="h-6 w-full"
          />
          <Box className="flex-1">
            <SelectInput
              field="timeOfAdmission"
              options={options}
              buttonClassName="h-6 w-full"
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
