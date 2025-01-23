'use client'

import { PropsWithRow, TextCell } from '@/components'
import { Patient } from '../types'
import { getPriorityInusranceName } from '../utils'

const InsuranceCell = ({
  row: { original: patient },
}: PropsWithRow<Patient>) => {
  return (
    <TextCell className="truncate">
      {getPriorityInusranceName(patient?.insurancePolicies ?? [])}
    </TextCell>
  )
}

export { InsuranceCell }
