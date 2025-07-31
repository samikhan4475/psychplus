import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment } from '@/types'
import { getCodesetDisplayName } from '@/utils'

const ProviderTypeCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const codes = useCodesetCodes(CODESETS.ProviderType)
  const value = getCodesetDisplayName(appointment.providerType, codes)
  return <TextCell className="whitespace-nowrap">{value}</TextCell>
}

export { ProviderTypeCell }
