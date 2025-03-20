'use client'

import { getReceiverListOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldError, FormFieldLabel } from '@/components'

const ReceiverSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Receiver</FormFieldLabel>
      <AsyncSelect
        field="receiverId"
        buttonClassName="w-full text-1"
        required
        fetchOptions={getReceiverListOptionsAction}
      />
      <FormFieldError name='receiverId' />
    </FormFieldContainer>
  )
}

export { ReceiverSelect }
