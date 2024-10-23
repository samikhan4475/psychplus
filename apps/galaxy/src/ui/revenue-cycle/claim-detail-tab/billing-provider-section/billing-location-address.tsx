'use client'

import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'

const BillingLocationAddress = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Billing Location Address</FormFieldLabel>
      <TextField.Root
        disabled={true}
        value={'2131465465'}
        size="1"
        placeholder="123455"
      />
    </FormFieldContainer>
  )
}

export { BillingLocationAddress }
