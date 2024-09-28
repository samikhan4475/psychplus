'use client'

import { useMemo } from 'react'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { generateTimeIntervals } from '@/ui/visit/add-visit/util'

const VisitTimeSelect = () => {
  const timeSlots = useMemo(() => generateTimeIntervals(), [])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Time</FormFieldLabel>
      <SelectInput
        field="visitTime"
        options={timeSlots}
        buttonClassName="flex-1 w-full"
      />
      <FormFieldError name="visitTime" />
    </FormFieldContainer>
  )
}

export { VisitTimeSelect }
