'use client'

import { FormFieldContainer, FormFieldLabel, TimeInput } from '@/components'

const FromTimeField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>From Time</FormFieldLabel>
      <TimeInput field="timeRangeStart" dateInputClass="h-6" className="w-[70px]" />
    </FormFieldContainer>
  )
}

export { FromTimeField }
