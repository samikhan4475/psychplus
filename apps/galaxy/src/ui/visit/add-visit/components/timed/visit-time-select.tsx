'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
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
  const visitDate = form.watch('visitDate')

  const timeSlots = useMemo(() => generateTimeIntervals(), [])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Time</FormFieldLabel>
      <SelectInput
        field="visitTime"
        options={timeSlots}
        buttonClassName="flex-1"
        disabled={!visitDate}
      />
      <FormFieldError name="visitTime" />
    </FormFieldContainer>
  )
}

export { VisitTimeDropdown }
