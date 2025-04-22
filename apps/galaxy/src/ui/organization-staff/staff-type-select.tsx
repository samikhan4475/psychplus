'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StaffTypeSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Staff Type</FormFieldLabel>
      <CodesetSelect
        name="staffType"
        codeset={CODESETS.UserActorCategory}
        className="w-[calc(100%-67px)]"
      />
    </FormFieldContainer>
  )
}

export { StaffTypeSelect }
