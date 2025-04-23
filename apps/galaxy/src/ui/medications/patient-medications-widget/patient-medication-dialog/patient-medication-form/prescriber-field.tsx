'use client'

import { getProvidersOptionsAction } from '@/actions'
import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'

const PrescriberField = ({ index }: DrugBlockProps) => {
  const field = getFieldName(index, 'prescribingStaffId')

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Prescriber</FormFieldLabel>
      <AsyncSelect
        field={field}
        placeholder="Select"
        fetchOptions={getProvidersOptionsAction}
        buttonClassName="w-full h-6"
        className="w-full"
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { PrescriberField }
