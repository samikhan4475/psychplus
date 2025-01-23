'use client'

import { useState } from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { ClaimUpdateSchemaType } from '../schema'

interface TableCellUnitsProps {
  rowIndex: number
}

const TableCellUnits: React.FC<TableCellUnitsProps> = ({ rowIndex }) => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  const { setValue, getValues } = form

  const [units, setUnits] = useState<string | number>(
    getValues(`claimServiceLines.${rowIndex}.units`) || '',
  )

  const updateFieldsWithUnits = (numberValue: number) => {
    const unitAmount =
      getValues(`claimServiceLines.${rowIndex}.unitAmount`) ?? 0
    const calculatedTotal = parseFloat((numberValue * unitAmount).toFixed(2))

    setValue(`claimServiceLines.${rowIndex}.units`, numberValue)
    setValue(`claimServiceLines.${rowIndex}.totalAmount`, calculatedTotal, {
      shouldDirty: true,
    })
  }

  return (
    <TextField.Root
      size="1"
      placeholder="0"
      className="[box-shadow:none]"
      value={units}
      onChange={(e) => {
        const inputValue = e.target.value
        if (inputValue === '') {
          setUnits('')
          setValue(`claimServiceLines.${rowIndex}.units`, 0)
          setValue(`claimServiceLines.${rowIndex}.totalAmount`, 0)
        } else {
          const numberValue = parseFloat(inputValue)
          if (!isNaN(numberValue)) {
            setUnits(inputValue)
          }
        }
      }}
      onBlur={(e) => updateFieldsWithUnits(Number(e.target.value))}
    />
  )
}

export { TableCellUnits }
