'use client'

import { FormFieldContainer, FormFieldLabel, TimeInput } from '@/components'

const InitiatedTimeField = () => {
  return (
    <>
      <FormFieldContainer className="flex-row items-center gap-1">
        <FormFieldLabel>Initiated From Time</FormFieldLabel>
        <TimeInput
          field="initiatedFromTime"
          dateInputClass="h-6"
          className="w-[70px]"
        />
      </FormFieldContainer>
      <FormFieldContainer className="flex-row items-center gap-1">
        <FormFieldLabel>Initiated To Time</FormFieldLabel>
        <TimeInput
          field="initiatedToTime"
          dateInputClass="h-6"
          className="w-[70px]"
        />
      </FormFieldContainer>
    </>
  )
}

export { InitiatedTimeField }
