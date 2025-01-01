import { TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName } from '@/utils'

const VisitMediumCell = ({ value }: { value: string }) => {
  const codes = useCodesetCodes(CODESETS.VisitMedium)
  const displayName = getCodesetDisplayName(value, codes)
  return <TextCell>{displayName}</TextCell>
}

export { VisitMediumCell }
