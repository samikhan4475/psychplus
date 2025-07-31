import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment } from '@/types'
import { getCodesetDisplayName } from '@/utils'

const VisitStatusCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const codes = useCodesetCodes(CODESETS.AppointmentStatus)
  const value = getCodesetDisplayName(appointment.visitStatus, codes)
  return <TextCell>{value}</TextCell>
}

export { VisitStatusCell }
