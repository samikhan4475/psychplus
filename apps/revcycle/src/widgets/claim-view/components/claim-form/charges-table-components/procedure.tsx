import React, { useCallback } from 'react'
import { Box } from '@radix-ui/themes'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { CPTCode } from '@/widgets/claim-view/types'
import { CPTSearchDropdown } from '../cpt-search-dropdown'
import { ClaimServiceLine } from '../types'

interface TableCellProps {
  row: {
    original: ClaimServiceLine
    index: number
  }
  form: UseFormReturn<any> // Adjust this type to match your form's schema
}

const TableCellProcedure = ({ row, form }: TableCellProps) => {
  const { setValue } = form

  // Use useWatch to watch the specific field
  const inputValue = useWatch({
    control: form.control,
    name: `claimServiceLines.${row.index}.cptCode`,
  })

  const handleProcedureChange = useCallback(
    (selectedItem: CPTCode) => {
      const { code, displayName } = selectedItem
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

  return (
    <Box id="cpt-search" className="relative">
      <CPTSearchDropdown
      
        onSelectItem={handleProcedureChange}
        cptCode={inputValue}
      />
    </Box>
  )
}

export { TableCellProcedure }
