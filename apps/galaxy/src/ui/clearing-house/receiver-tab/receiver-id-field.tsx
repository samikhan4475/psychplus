'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const ReceiverIdField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Rec. ID</FormFieldLabel>
      <TextInput field="receiverId" className="w-full" />
    </FormFieldContainer>
  )
}

export { ReceiverIdField }
