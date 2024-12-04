'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const PayerName = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Payer</FormFieldLabel>
      <TextInput field="payerName" className="w-full" placeHolder="Payer Name" />
    </FormFieldContainer>
  )
}

export { PayerName }
