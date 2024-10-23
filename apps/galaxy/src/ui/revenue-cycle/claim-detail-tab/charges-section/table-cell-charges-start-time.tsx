'use client'

import { Box, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ClaimUpdateSchemaType } from '../schema'

interface TableCellChargesStartTimeProps {
  rowIndex: number
}

const TableCellStartChargesTime = ({
  rowIndex,
}: TableCellChargesStartTimeProps) => {
  const { register } = useFormContext<ClaimUpdateSchemaType>()

  return (
    <Box className="flex-1">
      <TextField.Root
        type="time"
        placeholder="Select time"
        size="1"
        className="[box-shadow:none]"
        {...register(`claimServiceLines.${rowIndex}.startTime`)}
      />
    </Box>
  )
}

export { TableCellStartChargesTime }
