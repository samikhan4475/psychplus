import { LongTextCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { LocationPractice } from '@/types'
import { getServiceLabel } from '../utils'

const StateCell = ({ row: { original } }: PropsWithRow<LocationPractice>) => {
  const options = useCodesetOptions(CODESETS.UsStates)
  return (
    <LongTextCell>
      {getServiceLabel(
        options,
        original?.practice?.practiceAddress?.state ?? '',
      ) ?? 'N/A'}
    </LongTextCell>
  )
}

export { StateCell }
