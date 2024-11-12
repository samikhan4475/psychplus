'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const PayerIdField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Payer ID</FormFieldLabel>
      <TextInput field="payerId" className="w-full" />
      <FormFieldError name="payerId" />
    </FormFieldContainer>
  )
}

export { PayerIdField }
