'use client'

import { getReceiverListOptionsAction } from '@/actions'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { AsyncAutoCompleteTextField } from '../shared'

const ReceiverNameField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Receiver Name</FormFieldLabel>
      <AsyncAutoCompleteTextField
        fetchDataAction={getReceiverListOptionsAction}
        field="receiverId"
        placeholder="Name"
        className="h-5 w-[130px]"
        truncateText={12}
      />
    </FormFieldContainer>
  )
}

export { ReceiverNameField }
