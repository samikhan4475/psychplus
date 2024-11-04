import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './schema'

const ClaimStatusSelect = () => {
  const form = useFormContext<SchemaType>()
  const status = form.getValues('status')
  return (
    <FormFieldContainer className="flex flex-row items-center">
      <FormFieldLabel className="!text-1">Status:</FormFieldLabel>
      <CodesetSelect
        name="status"
        defaultValue='NotPosted'
        disabled
        codeset={CODESETS.PaymentPostingStatus}
        size="1"
        className={`w-[100px] border-none disabled:bg-transparent ${status === 'Posted' && 'disabled:text-green-9'} bg-transparent text-1 font-bold`}
      />
    </FormFieldContainer>
  )
}

export { ClaimStatusSelect }
