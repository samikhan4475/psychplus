'use client'

import { Box, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { calculateMinutes } from '@/utils'
import { ClaimUpdateSchemaType } from '../schema'

interface TableCellChargesStartTimeProps {
  rowIndex: number
}

const TableCellStartChargesTime = ({
  rowIndex,
}: TableCellChargesStartTimeProps) => {
  const { getValues, setValue, register } =
    useFormContext<ClaimUpdateSchemaType>()
  const isAnesthesia = getValues(`claimServiceLines.${rowIndex}.isAnesthesia`)
  const endTime = getValues(`claimServiceLines.${rowIndex}.endTime`)
  const unitAmount = getValues(`claimServiceLines.${rowIndex}.unitAmount`) ?? 0

  const updateFieldsByStartTime = (value: string) => {
    const minuteConvertion = calculateMinutes(value, endTime ?? '')
    const units = parseFloat((minuteConvertion / 15).toFixed(1))
    const totalAmount = parseFloat((units * unitAmount).toFixed(2))
    const minutes = minuteConvertion.toString()
    setValue(`claimServiceLines.${rowIndex}.minutes`, minutes.toString(), {
      shouldDirty: true,
    })
    setValue(`claimServiceLines.${rowIndex}.units`, Number(units), {
      shouldDirty: true,
    })
    setValue(`claimServiceLines.${rowIndex}.totalAmount`, totalAmount, {
      shouldDirty: true,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stTime = e.target.value
    updateFieldsByStartTime(stTime)
  }

  return (
    <Box className="flex-1">
      <TextField.Root
        type="time"
        placeholder="Select time"
        size="1"
        className="[box-shadow:none]"
        disabled={!isAnesthesia}
        {...register(`claimServiceLines.${rowIndex}.startTime`, {
          onChange: handleChange,
        })}
      />
    </Box>
  )
}

export { TableCellStartChargesTime }
