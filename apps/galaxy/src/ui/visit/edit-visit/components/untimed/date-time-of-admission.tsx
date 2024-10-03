'use client'

import { useMemo } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { DatePickerInput, SelectInput } from '@/components'
import { FormFieldError, FormFieldLabel } from '@/components/form'
import { generateTimeIntervals } from '@/ui/visit/add-visit/util'

const DateTimeOfAdmission = () => {
  const timeSlots = useMemo(() => generateTimeIntervals(), [])

  const options = timeSlots.map((v) => ({
    value: v.value,
    label: v.label,
  }))

  return (
    <Box className="flex-1">
      <Flex className="flex-1 gap-[2px]" direction={'column'}>
        <FormFieldLabel required>Date/Time of Admission</FormFieldLabel>
        <Box className="appointment-date-time grid grid-cols-5 gap-3">
          <DatePickerInput field="dateOfAdmission" dateInputClass="h-[21px]" />
          <Box className="flex-1">
            <SelectInput
              field="timeOfAdmission"
              options={options}
              buttonClassName="flex-1"
            />
            <FormFieldError name="timeOfAdmission" />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export { DateTimeOfAdmission }
