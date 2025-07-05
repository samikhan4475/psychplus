'use client'

import { FormFieldContainer, FormFieldLabel, NumericInput } from '@/components'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'

const QuantityField = ({ index }: DrugBlockProps) => {
  const field = getFieldName(index, 'quantityValue')
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Quantity</FormFieldLabel>
      <NumericInput
        placeholder="Quantity"
        field={field}
        className="h-6 w-full"
        prefix=""
        decimalScale={3}
        allowNegative={false}
        formatOnBlurOnly={true}
        maxLimit={999999999}
      />
    </FormFieldContainer>
  )
}

export { QuantityField }
