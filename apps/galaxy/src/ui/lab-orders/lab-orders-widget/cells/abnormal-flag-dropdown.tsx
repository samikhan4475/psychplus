import { Row } from '@tanstack/react-table'
import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { LabResult } from '@/types'
import { useStore } from '../store'
import { FlagStatusCell } from './lab-flag-status'

interface FlagStatusCellProps {
  row: Row<LabResult>
}

const AbnormalFlagDropdown = ({ row }: FlagStatusCellProps) => {
  const { editAbleLabResults } = useStore()
  const isAddingOrEditing = editAbleLabResults?.id === row.original.id
  return isAddingOrEditing ? (
    <CodesetSelect
      name={`labResults.abnormalRangeCode`}
      codeset={CODESETS.AbnormalFlag}
      size="1"
    />
  ) : (
    <FlagStatusCell row={row} />
  )
}

export { AbnormalFlagDropdown }
