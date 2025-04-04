'use client'

import { useState } from 'react'
import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormFieldError } from '@/components/form'
import { ClaimAddSchemaType } from '../schema'

interface TableCellUnitAmountProps {
  rowIndex: number
}

const UnitAmountCell = ({ rowIndex }: TableCellUnitAmountProps) => {
  const form = useFormContext<ClaimAddSchemaType>()
  const { setValue, getValues } = form

  const [unitAmount, setUnitAmount] = useState<string | number>(
    getValues(`claimServiceLines.${rowIndex}.unitAmount`) || '',
  )
  const updateFieldsWithUnits = (value: number) => {
    const units = getValues(`claimServiceLines.${rowIndex}.units`) ?? 0
    const calculatedTotal = parseFloat((value * units).toFixed(2))
    setValue(`claimServiceLines.${rowIndex}.unitAmount`, value, {
      shouldDirty: true,
    })
    setValue(`claimServiceLines.${rowIndex}.totalAmount`, calculatedTotal, {
      shouldDirty: true,
    })
  }
  return (
    <Flex direction={'column'}>
      <TextField.Root
        size="1"
        placeholder="0.00"
        className="[box-shadow:none]"
        value={unitAmount}
        onChange={(e) => {
          const inputValue = e.target.value
          if (inputValue === '') {
            setUnitAmount('')
            setValue(`claimServiceLines.${rowIndex}.unitAmount`, 0)
          } else {
            const numberValue = parseFloat(inputValue)
            if (!isNaN(numberValue)) {
              setValue(`claimServiceLines.${rowIndex}.unitAmount`, numberValue)
              setUnitAmount(inputValue)
            }
          }
        }}
        onBlur={(e) => updateFieldsWithUnits(Number(e.target.value))}
      />
      <FormFieldError name={`claimServiceLines.${rowIndex}.unitAmount`} />
    </Flex>
  )
}

export { UnitAmountCell }
