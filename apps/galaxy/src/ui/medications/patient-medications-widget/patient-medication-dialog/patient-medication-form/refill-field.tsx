'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { REFILLOPTIONS } from '../../constants'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'

const RefillField = ({ index }: DrugBlockProps) => {
  const field = getFieldName(index, 'refills')
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Refills</FormFieldLabel>
      <SelectInput
        options={REFILLOPTIONS}
        field={field}
        buttonClassName="w-full h-6"
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { RefillField }
