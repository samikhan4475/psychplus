'use client'

import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { VacationTime } from '../types'
import { getVacationStatusLabel } from '../utils'

const VacationStatusCell = ({
  row: { original },
}: PropsWithRow<VacationTime>) => {
  const options = useCodesetOptions(CODESETS.VacationStatus)
  return (
    <TextCell>
      {getVacationStatusLabel(options, original?.vacationStatus)}
    </TextCell>
  )
}

export { VacationStatusCell }
