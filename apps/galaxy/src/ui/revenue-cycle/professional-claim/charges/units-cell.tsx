'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormFieldError } from '@/components'
import { ClaimAddSchemaType } from '../schema'

interface UnitsCellProps {
  rowIndex: number
}

const UnitsCell: React.FC<UnitsCellProps> = ({ rowIndex }) => {
  const form = useFormContext<ClaimAddSchemaType>()
  const { setValue, getValues } = form
  const units =
    useWatch({
      control: form.control,
      name: `claimServiceLines.${rowIndex}.units`,
    }) ?? ''
    
  const updateFieldsWithUnits = (numberValue: number) => {
    const unitAmount =
      getValues(`claimServiceLines.${rowIndex}.unitAmount`) ?? 0
    const calculatedTotal = parseFloat((numberValue * unitAmount).toFixed(2))

    setValue(`claimServiceLines.${rowIndex}.units`, numberValue)
    setValue(`claimServiceLines.${rowIndex}.totalAmount`, calculatedTotal, {
      shouldDirty: true,
    })
    form.trigger(`claimServiceLines.${rowIndex}.units`)
  }

  return (
    <Flex direction={'column'} className="w-full max-w-full">
      <TextField.Root
        size="1"
        placeholder="0"
        className="[box-shadow:none]"
        value={units}
        onChange={(e) => {
          const inputValue = e.target.value
          if (inputValue === '') {
            setValue(`claimServiceLines.${rowIndex}.units`, 0)
            setValue(`claimServiceLines.${rowIndex}.totalAmount`, 0)
          } else {
            const numberValue = parseFloat(inputValue)
            if (!isNaN(numberValue)) {
              setValue(`claimServiceLines.${rowIndex}.units`, numberValue)
            }
          }
        }}
        onBlur={(e) => updateFieldsWithUnits(Number(e.target.value))}
      />
      <FormFieldError name={`claimServiceLines.${rowIndex}.units`} />
    </Flex>
  )
}

export { UnitsCell }
