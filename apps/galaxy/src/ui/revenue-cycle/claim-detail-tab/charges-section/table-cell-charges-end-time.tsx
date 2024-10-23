'use client'

import { Box, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ClaimUpdateSchemaType } from '../schema'

interface TableCellEndChargesTimeProps {
  rowIndex: number
}

const TableCellEndChargesTime = ({
  rowIndex,
}: TableCellEndChargesTimeProps) => {
  const { register } = useFormContext<ClaimUpdateSchemaType>()

  return (
    <Box className="flex-1">
      <TextField.Root
        type="time"
        placeholder="Select time"
        size="1"
        className="[box-shadow:none]"
        {...register(`claimServiceLines.${rowIndex}.endTime`)}
      />
    </Box>
  )
}

export { TableCellEndChargesTime }
