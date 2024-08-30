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

const TableCellUnitAmount = ({ row, form }: TableCellProps) => {
  const { setValue } = form
  const { setSelectedClaimBilledAmt } = useStore((state) => ({
    setSelectedClaimBilledAmt: state.setSelectedClaimBilledAmt,
  }))
  const calculateBilledAmount = useCalculateBilledAmount() // Use the custom hook

  const unitAmount = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.unitAmount`,
  })

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      // Convert to a number and handle empty input
      const numberValue = value === '' ? undefined : parseFloat(value)

      if (numberValue !== undefined && !isNaN(numberValue)) {
        const units = form.getValues(`claimServiceLines.${row.index}.units`)
        const safeUnits = units ?? 0
        const calculatedValue = (numberValue * safeUnits).toFixed(2)
        setValue(
          `claimServiceLines.${row.index}.totalAmount`,
          parseFloat(calculatedValue),
          {
            shouldValidate: true,
            shouldDirty: true,
          },
        )
        setValue(`claimServiceLines.${row.index}.unitAmount`, numberValue, {
          shouldValidate: true,
          shouldDirty: true,
        })
        const updatedBilledAmount = calculateBilledAmount(
          form.getValues('claimServiceLines'),
        )
        form.setValue(`totalAmount`, updatedBilledAmount)
        setSelectedClaimBilledAmt(Number(updatedBilledAmount))
      } else {
        // Clear the value if input is empty
        setValue(`claimServiceLines.${row.index}.unitAmount`, null, {
          shouldValidate: true,
          shouldDirty: true,
        })
      }
    },
    [row.index, setValue],
  )
  return (
    <Box className="flex-1">
      <TextField.Root
        size="1"
        placeholder="Unit Amount"
        value={unitAmount ?? ''}
        onChange={handleChange}
      />
    </Box>
  )
}

export { TableCellUnitAmount }
