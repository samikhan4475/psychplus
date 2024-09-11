import React, { useCallback } from 'react'
import { CellContext } from '@tanstack/react-table'
import { FieldError, UseFormReturn, useWatch } from 'react-hook-form'
import { Select } from '@psychplus/ui/select'
import { useStore } from '../../../store'
import { SchemaType } from '../add-claim-form'
import { ClaimServiceLine } from '../types'

interface TableCellProps {
  row: CellContext<ClaimServiceLine, string>['row']
  form: UseFormReturn<SchemaType>
}

const TableCellPOS = ({ row, form }: TableCellProps) => {
  const {
    setValue,
    formState: { errors },
  } = form
  // Type guard to ensure correct structure
  const getClaimServiceLineError = (index: number): FieldError | undefined => {
    if (errors.claimServiceLines && Array.isArray(errors.claimServiceLines)) {
      return errors.claimServiceLines[index]?.placeOfService
    }
    return undefined
  }

  const error = getClaimServiceLineError(row.index)
  // Get the POS codes from store or use static values
  const posCodes = useStore((state) => state.posCodeSets)

  // Watch the POS value for the current row
  const posValue = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.placeOfService`,
  })

  // Handle value change
  const handleChange = useCallback(
    (value: string) => {
      setValue(`claimServiceLines.${row.index}.placeOfService`, value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    },
    [setValue, row.index],
  )

  return (
    <Select.Root size="1" value={posValue ?? '01'} onValueChange={handleChange}>
      <Select.Trigger
        className={error ? 'border border-solid border-[#ef3a3a]' : ''}
      />
      <Select.Content>
        <Select.Group>
          {posCodes.map((code) => (
            <Select.Item key={code.code} value={code.code}>
              {code.display}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export { TableCellPOS }
