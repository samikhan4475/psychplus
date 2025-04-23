'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'

const MedicationStatusField = ({ index }: DrugBlockProps) => {
  const field = getFieldName(index, 'medicationStatus')

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Medication Status</FormFieldLabel>
      <CodesetSelect
        placeholder="Select"
        name={field}
        codeset={CODESETS.MedicationStatus}
        defaultValue="Active"
        size="1"
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { MedicationStatusField }
