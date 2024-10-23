'use client'

import { Box, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ClaimUpdateSchemaType } from '../schema'

interface TableCellUnitAmountProps {
  rowIndex: number
}

const TableCellUnitAmount = ({ rowIndex }: TableCellUnitAmountProps) => {
  const { register } = useFormContext<ClaimUpdateSchemaType>()
  return (
    <TextField.Root
      size="1"
      placeholder="0.00"
      className="[box-shadow:none]"
      {...register(`claimServiceLines.${rowIndex}.unitAmount`)}
    />
  )
}

export { TableCellUnitAmount }
