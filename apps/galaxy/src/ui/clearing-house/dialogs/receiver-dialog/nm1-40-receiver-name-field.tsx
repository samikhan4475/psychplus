'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const NM140ReceiverNameField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>NM1_40_ReceiverName</FormFieldLabel>
      <TextInput field="nm140ReceiverName" className="w-full" />
    </FormFieldContainer>
  )
}

export { NM140ReceiverNameField }
