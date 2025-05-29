'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  NumberInput,
} from '@/components'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'

const DurationField = ({ index }: DrugBlockProps) => {
  const field = getFieldName(index, 'duration')
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Duration</FormFieldLabel>
      <NumberInput
        format="##"
        placeholder="Duration"
        field={field}
        className="h-6 w-full"
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { DurationField }
