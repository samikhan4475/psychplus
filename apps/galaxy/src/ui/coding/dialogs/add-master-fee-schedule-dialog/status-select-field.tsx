import React from 'react'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { OrderStatus } from '@/ui/lab-orders/lab-orders-widget/types'

const StatusSelectField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Status</FormFieldLabel>
      <CodesetSelect
        name="recordStatus"
        codeset={CODESETS.RecordStatus}
        size="1"
        exclude={['Deleted', 'Archived']}
      />
      <FormFieldError name="recordStatus" />
    </FormFieldContainer>
  )
}

export { StatusSelectField }
