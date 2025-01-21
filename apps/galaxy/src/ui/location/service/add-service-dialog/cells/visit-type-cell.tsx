'use client'

import { PropsWithRow, TextCell } from '@/components'
import { Encounter } from '@/types'

const VisitTypeCell = ({ row: { original } }: PropsWithRow<Encounter>) => {
  return (
    <TextCell>
      {`${original?.typeOfVisit} - ${original?.visitSequence} - ${original?.visitMedium}`}
    </TextCell>
  )
}

export { VisitTypeCell }
