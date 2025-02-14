'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const CredntialsSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Credentials</FormFieldLabel>
      <CodesetSelect
        name="honors.[0]"
        codeset={CODESETS.PractitionerHonor}
        size="1"
        className="w-[calc(100%-75px)]"
      />
    </FormFieldContainer>
  )
}

export { CredntialsSelect }
