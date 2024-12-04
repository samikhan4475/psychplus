'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { PayerFormSchemaType } from './add-payer-form'

const PayerName = () => {
  const form = useFormContext<PayerFormSchemaType>()

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="!text-1" required>
        Name
      </FormFieldLabel>
      <TextField.Root size="1" {...form.register('payername')} placeholder='Payer Name'/>
      <FormFieldError name="payername" />
    </FormFieldContainer>
  )
}

export { PayerName }
