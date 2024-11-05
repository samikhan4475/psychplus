'use client'

import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getReceiverListOptionsAction } from '../../actions'

const ReceiverSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Receiver</FormFieldLabel>
      <AsyncSelect
        field="receiverId"
        buttonClassName="w-full h-6"
        required
        fetchOptions={getReceiverListOptionsAction}
      />
    </FormFieldContainer>
  )
}

export { ReceiverSelect }
