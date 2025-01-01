'use client'

import { useEffect } from 'react'
import { getLocalTimeZone, today } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { FormFieldLabel } from '@/components/form'
import { SchemaType } from '../../schema'

const DischargeDate = () => {
  const form = useFormContext<SchemaType>()

  const [dateOfAdmission, patient, state, service, location, visitSequence] =
    useWatch({
      control: form.control,
      name: [
        'dateOfAdmission',
        'patient',
        'state',
        'service',
        'location',
        'visitSequence',
      ],
    })

  useEffect(() => {
    const dischargeDate = form.getValues('dischargeDate')
    if (visitSequence === 'InitialDischarge' && dischargeDate) {
      form.setValue('dischargeDate', dateOfAdmission)
    }
  }, [visitSequence])

  const minValue =
    dateOfAdmission && dateOfAdmission > today(getLocalTimeZone())
      ? undefined
      : dateOfAdmission
  const maxValue = today(getLocalTimeZone())
  const isDisabled = !patient || !state || !service || !location

  return (
    <Flex direction={'column'} className="flex-1 gap-[2px]">
      <FormFieldLabel>Discharge Date</FormFieldLabel>
      <DatePickerInput
        field="dischargeDate"
        isDisabled={isDisabled}
        dateInputClass="h-6 w-full"
        minValue={minValue}
        maxValue={
          visitSequence === 'InitialDischarge' ? dateOfAdmission : maxValue
        }
      />
    </Flex>
  )
}

export { DischargeDate }
