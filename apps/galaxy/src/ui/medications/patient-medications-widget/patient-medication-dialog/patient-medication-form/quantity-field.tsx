'use client'

import { FormFieldContainer, FormFieldLabel, NumericInput } from '@/components'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'

const QuantityField = ({ index }: DrugBlockProps) => {
  const field = getFieldName(index, 'quantityValue')
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Quantity</FormFieldLabel>
      <NumericInput
        placeholder="Quantity"
        field={field}
        className="h-6 w-full"
        prefix=""
        decimalScale={0}
        allowNegative={false}
      />
    </FormFieldContainer>
  )
}

export { QuantityField }
