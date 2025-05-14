'use client'

import { FormFieldContainer, FormFieldLabel, TimeInput } from '@/components'

const ToTimeField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>To Time</FormFieldLabel>
      <TimeInput field="timeRangeEnd" dateInputClass="h-6" className="w-[70px]" />
    </FormFieldContainer>
  )
}

export { ToTimeField }
