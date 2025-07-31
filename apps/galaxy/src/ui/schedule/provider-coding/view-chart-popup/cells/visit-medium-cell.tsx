import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment } from '@/types'
import { getCodesetDisplayName } from '@/utils'

const VisitMediumCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const codes = useCodesetCodes(CODESETS.VisitMedium)
  const value = getCodesetDisplayName(appointment.visitMedium, codes)
  return <TextCell>{value}</TextCell>
}

export { VisitMediumCell }
