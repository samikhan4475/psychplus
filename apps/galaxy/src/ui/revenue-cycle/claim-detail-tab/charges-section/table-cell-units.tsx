'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { ClaimUpdateSchemaType } from '../schema'

interface TableCellUnitsProps {
  rowIndex: number
}

const TableCellUnits: React.FC<TableCellUnitsProps> = ({ rowIndex }) => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  const { setValue, register } = form

  const unitAmount =
    useWatch({
      control: form.control,
      name: `claimServiceLines.${rowIndex}.unitAmount`,
    }) ?? 0

  const updateFieldsWithUnits = (numberValue: number) => {
    const calculatedTotal = parseFloat((numberValue * unitAmount).toFixed(2))
    setValue(`claimServiceLines.${rowIndex}.totalAmount`, calculatedTotal, {
      shouldDirty: true,
    })
  }
  return (
    <TextField.Root
      size="1"
      placeholder="Units"
      className="[box-shadow:none]"
      {...register(`claimServiceLines.${rowIndex}.units`, {
        onChange: (e) => {
          const numberValue = parseFloat(e.target.value)
          if (!isNaN(numberValue)) {
            updateFieldsWithUnits(numberValue)
          }
        },
      })}
    />
  )
}

export { TableCellUnits }
