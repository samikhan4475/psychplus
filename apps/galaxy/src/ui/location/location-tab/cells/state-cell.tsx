import { LongTextCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks' 
import { getServiceLabel } from '../utils'
import { Location } from '@/types'

const StateCell = ({ row: { original } }: PropsWithRow<Location>) => {
  const options = useCodesetOptions(CODESETS.UsStates)
  return (
    <LongTextCell>
      {getServiceLabel(options, original?.address?.state ?? '') ?? 'N/A'}
    </LongTextCell>
  )
}

export { StateCell }
