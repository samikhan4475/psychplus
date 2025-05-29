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

const DrugFormField = ({ index }: DrugBlockProps) => {
  const field = getFieldName(index, 'doseFormCode')
  return (
    <FormFieldContainer>
      <FormFieldLabel>Drug Form</FormFieldLabel>
      <CodesetSelect
        className="h-6 w-[155px]"
        name={field}
        codeset={CODESETS.PrescriptionDosageFormList}
        size="1"
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { DrugFormField }
