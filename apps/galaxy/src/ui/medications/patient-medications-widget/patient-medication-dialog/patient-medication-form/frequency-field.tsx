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

const FrequencyField = ({ index }: DrugBlockProps) => {
  const field = getFieldName(index, 'doseFrequencyCode')

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Frequency</FormFieldLabel>
      <CodesetSelect
        placeholder="Select"
        name={field}
        codeset={CODESETS.PrescriptionFrequencyList}
        size="1"
        className="w-full"
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { FrequencyField }
