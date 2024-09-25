import React, { useCallback } from 'react'
import { Box } from '@radix-ui/themes'
import { FieldError, UseFormReturn, useWatch } from 'react-hook-form'
import { CPTCode } from '@/widgets/claim-view/types'
import { getCPTSearchedRecords } from '@/widgets/coding-cpt/api.client'
import { CPTRecord } from '@/widgets/coding-cpt/components'
import { SchemaType } from '../add-claim-form'
import { CPTSearchDropdown } from '../cpt-search-dropdown'
import { ClaimServiceLine } from '../types'

interface TableCellProps {
  row: {
    original: ClaimServiceLine
    index: number
  }
  form: UseFormReturn<SchemaType> // Adjust this type to match your form's schema
}

const TableCellProcedure = ({ row, form }: TableCellProps) => {
  const {
    setValue,
    formState: { errors },
  } = form
  // Type guard to ensure correct structure
  const getClaimServiceLineError = (index: number): FieldError | undefined => {
    if (errors.claimServiceLines && Array.isArray(errors.claimServiceLines)) {
      return errors.claimServiceLines[index]?.cptCode
    }
    return undefined
  }

  const error = getClaimServiceLineError(row.index)

  // Use useWatch to watch the specific field
  const inputValue = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.cptCode`,
  })

  const handleProcedureChange = useCallback(
    async (selectedItem: CPTCode) => {
      const { code, displayName } = selectedItem
      const result = await fetchAndProcessCPTData(code)

      if (result) {
        const { medicareAmount, category } = result
        if (category === 'Anesthesia') {
          form.setValue(`claimServiceLines.${row.index}.isAnesthesia`, true)
        }
        setValue(`claimServiceLines.${row.index}.totalAmount`, medicareAmount, {
          shouldValidate: true,
          shouldDirty: true,
        })
        setValue(`claimServiceLines.${row.index}.unitAmount`, medicareAmount, {
          shouldValidate: true,
          shouldDirty: true,
        })
      }
      setValue(`claimServiceLines.${row.index}.cptCode`, code, {
        shouldValidate: true,
        shouldDirty: true,
      })
      setValue(`claimServiceLines.${row.index}.cptDescription`, displayName, {
        shouldValidate: true,
        shouldDirty: true,
      })
    },
    [setValue, row.index],
  )

  const fetchAndProcessCPTData = async (
    code: string,
  ): Promise<{ medicareAmount: number; category: string } | null> => {
    try {
      const data = await getCPTSearchedRecords(0, 0, { cptCode: code })
      const response = data as CPTRecord[]

      if (response.length > 0) {
        const apiResponse = response[0]
        const medicareAmount =
          apiResponse.medicareAmount !== undefined &&
          apiResponse.medicareAmount !== null
            ? parseFloat(apiResponse.medicareAmount)
            : 0
        const category = apiResponse.category ?? ''
        return { medicareAmount, category }
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  }

  return (
    <Box id="cpt-search" className="relative">
      <CPTSearchDropdown
        onSelectItem={handleProcedureChange}
        cptCode={inputValue}
        isError={error?.message ? true : false}
        error={error}
      />
    </Box>
  )
}

export { TableCellProcedure }
