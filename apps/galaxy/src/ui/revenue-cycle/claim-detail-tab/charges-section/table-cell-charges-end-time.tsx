'use client'

import { useEffect } from 'react'
import { Box, TextField } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { calculateMinutes } from '@/utils'
import { ClaimUpdateSchemaType } from '../schema'

interface TableCellEndChargesTimeProps {
  rowIndex: number
}

const TableCellEndChargesTime = ({
  rowIndex,
}: TableCellEndChargesTimeProps) => {
  const { getValues, setValue, register } =
    useFormContext<ClaimUpdateSchemaType>()
  const isAnesthesia = getValues(`claimServiceLines.${rowIndex}.isAnesthesia`)
  const startTime = getValues(`claimServiceLines.${rowIndex}.startTime`)
  const unitAmount = getValues(`claimServiceLines.${rowIndex}.unitAmount`) ?? 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const minutes = calculateMinutes(startTime ?? '', value)

    const units = (minutes / 15).toFixed(1)
    const calculatedValue = (Number(units) * unitAmount).toFixed(2)
    setValue(`claimServiceLines.${rowIndex}.minutes`, minutes.toString(), {
      shouldValidate: true,
    })
    setValue(`claimServiceLines.${rowIndex}.units`, Number(units), {
      shouldValidate: true,
    })
    setValue(
      `claimServiceLines.${rowIndex}.totalAmount`,
      parseFloat(calculatedValue),
      {
        shouldValidate: true,
      },
    )
  }

  return (
    <Box className="flex-1">
      <TextField.Root
        type="time"
        placeholder="Select time"
        size="1"
        className="[box-shadow:none]"
        disabled={!isAnesthesia}
        {...register(`claimServiceLines.${rowIndex}.endTime`, {
          onChange: handleChange,
        })}
      />
    </Box>
  )
}

export { TableCellEndChargesTime }
