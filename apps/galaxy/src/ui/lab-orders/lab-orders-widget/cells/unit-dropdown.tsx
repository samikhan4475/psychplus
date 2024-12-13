import { Row } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { CodesetSelect, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { LabResult } from '@/types'
import { SchemaType } from '../schema'

interface FlagStatusCellProps {
  row: Row<LabResult>
}

const UnitDropdown = ({ row }: FlagStatusCellProps) => {
  const form = useFormContext<SchemaType>()
  const isEditing = form.getValues('editingLabResultId') === row.original.id
  return isEditing ? (
    <CodesetSelect
      name={`labResults.${row.index}.resultValueUnit`}
      codeset={CODESETS.Unit}
      size="1"
    />
  ) : (
    <TextCell>{row.original.resultValueUnit}</TextCell>
  )
}

export { UnitDropdown }
