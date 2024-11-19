'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError } from '@/components/form'
import { ClaimUpdateSchemaType } from '../schema'

interface TableCellUnitAmountProps {
  rowIndex: number
}

const TableCellUnitAmount = ({ rowIndex }: TableCellUnitAmountProps) => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  const { setValue, register, getValues } = form
  const updateFieldsWithUnitAmount = (value: string) => {
    const numberValue = value === '' ? undefined : parseFloat(value)
    if (numberValue !== undefined && !isNaN(numberValue) && numberValue >= 0) {
      const units = getValues(`claimServiceLines.${rowIndex}.units`) ?? 0
      const calculatedTotal = parseFloat((numberValue * units).toFixed(2))

      setValue(`claimServiceLines.${rowIndex}.totalAmount`, calculatedTotal, {
        shouldDirty: true,
      })
    }
  }
  return (
    <Flex direction={'column'}>
      <TextField.Root
        size="1"
        placeholder="0.00"
        className="[box-shadow:none]"
        {...register(`claimServiceLines.${rowIndex}.unitAmount`, {
          onChange: (e) => updateFieldsWithUnitAmount(e.target.value),
        })}
      />
      <FormFieldError name={`claimServiceLines.${rowIndex}.unitAmount`} />
    </Flex>
  )
}

export { TableCellUnitAmount }
