'use client'

import { FormFieldContainer, FormFieldLabel, TimeInput } from '@/components'

const AdmitTimeField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Admit Time</FormFieldLabel>
      <TimeInput field="admitTime" dateInputClass="h-6" className="w-[70px]" />
    </FormFieldContainer>
  )
}

export { AdmitTimeField }
