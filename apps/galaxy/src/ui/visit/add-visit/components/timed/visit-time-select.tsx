'use client'

import { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SchemaType } from '../../schema'
import { generateTimeIntervals } from '../../util'

const VisitTimeDropdown = () => {
  const form = useFormContext<SchemaType>()
  const visitDate = useWatch({
    control: form.control,
    name: 'visitDate',
  })

  const timeSlots = useMemo(() => generateTimeIntervals(), [])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Time</FormFieldLabel>
      <SelectInput
        field="visitTime"
        options={timeSlots}
        buttonClassName="h-6 w-full"
        disabled={!visitDate}
      />
      <FormFieldError name="visitTime" />
    </FormFieldContainer>
  )
}

export { VisitTimeDropdown }
