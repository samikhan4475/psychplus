import { TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const VisitMedium = ({ visit }: { visit: string }) => {
  const codes = useCodesetCodes(CODESETS.VisitMedium)
  const visitMedium = codes.find((code) => code.value === visit)?.display
  return <TextCell>{visitMedium ?? visit}</TextCell>
}

export { VisitMedium }
