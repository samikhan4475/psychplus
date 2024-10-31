'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const ReceiverNameField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Receiver Name</FormFieldLabel>
      <TextInput field="receiverName" className="w-full" />
      <FormFieldError name="receiverName" />
    </FormFieldContainer>
  )
}

export { ReceiverNameField }
