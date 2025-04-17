'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StaffTypeSelect = () => {
  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel>Staff Type</FormFieldLabel>
      <CodesetSelect
        name="actorCategory"
        codeset={CODESETS.UserActorCategory}
      />
    </FormFieldContainer>
  )
}

export { StaffTypeSelect }
