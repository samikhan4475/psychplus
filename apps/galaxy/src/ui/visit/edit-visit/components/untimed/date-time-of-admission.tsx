'use client'

import { useMemo } from 'react'
import { Box, Flex, Grid } from '@radix-ui/themes'
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
        <Box className="appointment-date-time">
          <Grid columns="12" className="gap-3">
            <Box className="col-span-6">
              <DatePickerInput
                field="dateOfAdmission"
                dateInputClass="h-6 w-full"
              />
              <FormFieldError name="dateOfAdmission" />
            </Box>
            <Box className="col-span-6">
              <SelectInput
                field="timeOfAdmission"
                options={options}
                buttonClassName="h-6 w-full"
              />
              <FormFieldError name="timeOfAdmission" />
            </Box>
          </Grid>
        </Box>
      </Flex>
    </Box>
  )
}

export { DateTimeOfAdmission }
