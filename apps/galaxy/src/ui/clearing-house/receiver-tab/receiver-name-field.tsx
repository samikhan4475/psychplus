'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const ReceiverNameField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Rec. Name</FormFieldLabel>
      <TextInput field="receiverName" className="w-full" />
    </FormFieldContainer>
  )
}

export { ReceiverNameField }
