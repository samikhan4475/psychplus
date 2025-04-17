'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StaffTypeSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Staff Type</FormFieldLabel>
      <CodesetSelect
        name="actorCategory"
        codeset={CODESETS.UserActorCategory}
        size="1"
        className="w-[200px]"
      />
    </FormFieldContainer>
  )
}

export { StaffTypeSelect }
