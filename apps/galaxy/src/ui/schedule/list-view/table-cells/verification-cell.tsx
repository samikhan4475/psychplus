import { TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName } from '@/utils'

const VerificationStatusCell = ({ value }: { value: string }) => {
  const codes = useCodesetCodes(CODESETS.VerificationStatus)
  const displayName = getCodesetDisplayName(value, codes)
  return <TextCell>{displayName}</TextCell>
}

export { VerificationStatusCell }
