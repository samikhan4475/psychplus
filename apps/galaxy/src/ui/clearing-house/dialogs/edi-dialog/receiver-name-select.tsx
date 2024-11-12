'use client'

import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { getReceiverNamesListOptionsAction } from '../../actions'

const ReceiverNameSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Receiver Name</FormFieldLabel>
      <AsyncSelect
        field="receiverId"
        fetchOptions={getReceiverNamesListOptionsAction}
        buttonClassName="w-full"
      />
      <FormFieldError name="receiverId" />
    </FormFieldContainer>
  )
}

export { ReceiverNameSelect }
