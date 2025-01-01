import { TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName } from '@/utils'

const ProviderTypeCell = ({ code }: { code: string }) => {
  const codes = useCodesetCodes(CODESETS.ProviderType)
  return (
    <TextCell className="whitespace-nowrap">
      {getCodesetDisplayName(code, codes)}
    </TextCell>
  )
}

export { ProviderTypeCell }
