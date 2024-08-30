import React, { useCallback } from 'react'
import { Box } from '@radix-ui/themes'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { TextField } from '@psychplus/ui/text-field'
import { useStore } from '@/widgets/claim-view/store'
import { SchemaType } from '../add-claim-form'
import { ClaimServiceLine } from '../types'
import useCalculateBilledAmount from '../useCalculateBilledAmount'

interface TableCellProps {
  row: {
    original: ClaimServiceLine
    index: number
  }
  form: UseFormReturn<SchemaType>
}

const TableCellUnits = ({ row, form }: TableCellProps) => {
  const { setValue } = form
  const { setSelectedClaimBilledAmt } = useStore((state) => ({
    setSelectedClaimBilledAmt: state.setSelectedClaimBilledAmt,
  }))
  const calculateBilledAmount = useCalculateBilledAmount() // Use the custom hook

  const units = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.units`,
  })

  const unitAmount = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.unitAmount`,
  })

  // Convert unitAmount to a number or fallback to 0 if it's null or undefined
  const safeUnitAmount = unitAmount ?? 0

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      // Convert to a number and handle empty input
      const numberValue = value === '' ? undefined : parseFloat(value)

      if (numberValue !== undefined && !isNaN(numberValue)) {
        // Calculate the totalAmount
        const calculatedValue = (numberValue * safeUnitAmount).toFixed(2)

        // Update units and totalAmount in the form
        setValue(`claimServiceLines.${row.index}.units`, numberValue, {
          shouldValidate: true,
          shouldDirty: true,
        })
        setValue(
          `claimServiceLines.${row.index}.totalAmount`,
          parseFloat(calculatedValue),
          {
            shouldValidate: true,
            shouldDirty: true,
          },
        )
        const updatedBilledAmount = calculateBilledAmount(
          form.getValues('claimServiceLines'),
        )
        form.setValue(`totalAmount`, updatedBilledAmount)
        setSelectedClaimBilledAmt(Number(updatedBilledAmount))
      } else {
        // Clear the units field if input is empty
        setValue(`claimServiceLines.${row.index}.units`, null, {
          shouldValidate: true,
          shouldDirty: true,
        })
      }
    },
    [row.index, setValue, safeUnitAmount],
  )

  return (
    <Box className="flex-1">
      <TextField.Root
        size="1"
        placeholder="Units"
        value={units ?? ''}
        onChange={handleChange}
        type="number" // Ensures numeric input is handled properly
        step="0.01" // Allows for decimal input
      />
    </Box>
  )
}

export { TableCellUnits }
