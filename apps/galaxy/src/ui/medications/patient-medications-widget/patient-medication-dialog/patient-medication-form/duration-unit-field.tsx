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

const DurationUnitField = ({ index }: DrugBlockProps) => {
  const field = getFieldName(index, 'durationUnitCode')

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Duration Unit</FormFieldLabel>
      <CodesetSelect
        name={field}
        placeholder="Select"
        codeset={CODESETS.DurationUnit}
        defaultValue="Days"
        size="1"
        className="w-full"
        includeEmptyOption
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { DurationUnitField }
