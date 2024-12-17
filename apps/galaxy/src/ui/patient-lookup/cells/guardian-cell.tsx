'use client'

import { PropsWithRow, TextCell } from '@/components'
import { Patient } from '../types'

const GuardianCell = ({
  row: { original: patient },
}: PropsWithRow<Patient>) => {
  return <TextCell>{patient?.hasGuardian ? 'Yes' : 'No'}</TextCell>
}

export { GuardianCell }
