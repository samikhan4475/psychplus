import { TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName } from '@/utils'

const ServiceCell = ({ serviceCode }: { serviceCode: string }) => {
  const codes = useCodesetCodes(CODESETS.ServicesOffered)
  return (
    <TextCell className="whitespace-nowrap">
      {getCodesetDisplayName(serviceCode, codes)}
    </TextCell>
  )
}

export { ServiceCell }
