'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const GenderSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Gender</FormFieldLabel>
      <CodesetSelect
        name="gender"
        codeset={CODESETS.Gender}
        size="1"
        className="w-[calc(100%-50px)]"
      />
    </FormFieldContainer>
  )
}

export { GenderSelect }
