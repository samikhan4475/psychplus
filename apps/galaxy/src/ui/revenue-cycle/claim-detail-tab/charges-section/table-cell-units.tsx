'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

interface TableCellUnitsProps {
  rowIndex: number
}

const TableCellUnits: React.FC<TableCellUnitsProps> = ({ rowIndex }) => {
  const { register } = useFormContext()

  return (
    <TextField.Root
      size="1"
      placeholder="Units"
      className="[box-shadow:none]"
      {...register(`claimServiceLines.${rowIndex}.units`)}
    />
  )
}

export { TableCellUnits }
