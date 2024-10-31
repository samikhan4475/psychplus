'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const NM140ReceiverIdField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>NM1_40_ReceiverId</FormFieldLabel>
      <TextInput field="nm140ReceiverId" className="w-full" />
      <FormFieldError name="nm140ReceiverId" />
    </FormFieldContainer>
  )
}

export { NM140ReceiverIdField }
