import { TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName } from '@/utils'

const GenderCell = ({ value }: { value: string }) => {
  const codes = useCodesetCodes(CODESETS.Gender)
  const displayName = getCodesetDisplayName(value, codes)
  return <TextCell>{displayName}</TextCell>
}

export { GenderCell }
