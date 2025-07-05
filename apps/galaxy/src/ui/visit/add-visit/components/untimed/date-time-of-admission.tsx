'use client'

import { useMemo } from 'react'
import { getLocalTimeZone, today } from '@internationalized/date'
import { Box, Flex } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { DatePickerInput, SelectInput } from '@/components'
import { FormFieldError, FormFieldLabel } from '@/components/form'
import { SchemaType } from '../../schema'
import { generateTimeIntervals } from '../../util'

const DateTimeOfAdmission = () => {
  const form = useFormContext<SchemaType>()
  const [dischargeDate, patient, state, service, location] = useWatch({
    control: form.control,
    name: ['dischargeDate', 'patient', 'state', 'service', 'location'],
  })
  const isDisabled = !patient || !state || !service || !location
  const timeSlots = useMemo(() => generateTimeIntervals(), [])
  const options = timeSlots.map((v) => ({
    label: v.label,
    value: v.value,
  }))
  return (
    <Flex direction={'column'} className="flex-1 gap-[2px]">
      <FormFieldLabel required>Date/Time of Admission</FormFieldLabel>
      <Flex className="flex-1 gap-1">
        <DatePickerInput
          field="dateOfAdmission"
          className="w-auto flex-1"
          isDisabled={isDisabled}
          dateInputClass="h-6 flex-1"
          handleChange={(date) => {
            if (dischargeDate && date > dischargeDate) {
              form.setValue('dischargeDate', undefined)
            }
          }}
          maxValue={today(getLocalTimeZone())}
        />
        <Box>
          <SelectInput
            field="timeOfAdmission"
            disabled={isDisabled}
            options={options}
            buttonClassName="h-6 w-full"
          />
          <FormFieldError name="timeOfAdmission" />
        </Box>
      </Flex>
    </Flex>
  )
}

export { DateTimeOfAdmission }
