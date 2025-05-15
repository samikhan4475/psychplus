import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment } from '@/types'
import { getCodesetDisplayName } from '@/utils'

const VisitStatusCell = ({ row }: { row: Row<Appointment> }) => {
  const codes = useCodesetCodes(CODESETS.AppointmentStatus)
  return (
    <TextCell className="whitespace-nowrap pl-1">
      {getCodesetDisplayName(row.original.visitStatus, codes)}
    </TextCell>
  )
}

export { VisitStatusCell }
