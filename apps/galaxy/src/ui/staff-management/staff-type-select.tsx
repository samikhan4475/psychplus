import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StaffTypeSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Staff Type</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.UserActorCategory}
        name="staffType"
        className="w-[calc(100%-63px)]"
      />
    </FormFieldContainer>
  )
}

export { StaffTypeSelect }
