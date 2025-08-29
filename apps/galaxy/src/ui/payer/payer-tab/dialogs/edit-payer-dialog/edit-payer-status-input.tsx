'use client'

import { CodesetSelect } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { CODESETS } from '@/constants'

const EditPayerStatus = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="!text-1" required>
        Payer Status
      </FormFieldLabel>
      <CodesetSelect
        name="recordStatus"
        codeset={CODESETS.RecordStatus}
        size="1"
        placeholder="Select status"
        exclude={['Deleted', 'Archived']}
      />
      <FormFieldError name="recordStatus" />
    </FormFieldContainer>
  )
}

export { EditPayerStatus }
