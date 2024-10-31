import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ClaimStatusSelect = () => {
  return (
    <FormFieldContainer className="flex flex-row items-center">
      <FormFieldLabel className="!text-1">Status:</FormFieldLabel>
      <CodesetSelect
        name="claimStatus"
        codeset={CODESETS.Gender}
        size="1"
        className="w-[100px] border-none bg-transparent text-1 font-bold  text-green-9"
      />
    </FormFieldContainer>
  )
}

export { ClaimStatusSelect }
