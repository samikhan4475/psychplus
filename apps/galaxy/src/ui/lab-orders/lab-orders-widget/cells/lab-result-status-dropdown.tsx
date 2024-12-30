'use client'

import { Row } from '@tanstack/react-table'
import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { LabResult } from '@/types'
import { useStore } from '../store'
import { ResultStatusCell } from './result-status-cell'

interface FlagStatusCellProps {
  row: Row<LabResult>
}

const LabResultStatusDropdown = ({ row }: FlagStatusCellProps) => {
  const { editAbleLabResults } = useStore()
  const isAddingOrEditing = editAbleLabResults?.id === row.original.id
  return isAddingOrEditing ? (
    <CodesetSelect
      name={`labResults.statusCode`}
      codeset={CODESETS.StatusCodes}
      size="1"
    />
  ) : (
    <ResultStatusCell row={row} />
  )
}

export { LabResultStatusDropdown }
