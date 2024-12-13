import { Row } from '@tanstack/react-table'
import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { LabResult } from '@/types'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from '../schema'
import { FlagStatusCell } from './lab-flag-status'

interface FlagStatusCellProps {
  row: Row<LabResult>
}

const AbnormalFlagDropdown = ({ row }: FlagStatusCellProps) => {
 const form = useFormContext<SchemaType>()
  const isEditing = form.getValues('editingLabResultId') === row.original.id
  return isEditing ? (
    <CodesetSelect
      name={`labResults.${row.index}.abnormalRangeCode`}
      codeset={CODESETS.AbnormalFlag}
      size="1"
    />
  ) : <FlagStatusCell row={row} />
}

export { AbnormalFlagDropdown }
