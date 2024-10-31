'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const ReceiverIdField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Receiver ID</FormFieldLabel>
      <TextInput field="receiverId" className="w-full" />
      <FormFieldError name="receiverId" />
    </FormFieldContainer>
  )
}

export { ReceiverIdField }
