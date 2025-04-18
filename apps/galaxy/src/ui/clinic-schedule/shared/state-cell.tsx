import { TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName } from '@/utils'

const StateCell = ({ code }: { code: string }) => {
  const codes = useCodesetCodes(CODESETS.UsStates)
  return (
    <TextCell className="whitespace-nowrap">
      {getCodesetDisplayName(code, codes)}
    </TextCell>
  )
}

export { StateCell }
