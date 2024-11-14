'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const PayerName = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="!text-1" required>
        Name
      </FormFieldLabel>
      <TextInput field="name" placeHolder="Payer Name" className="w-full" />
      <FormFieldError name="name" />
    </FormFieldContainer>
  )
}

export { PayerName }
