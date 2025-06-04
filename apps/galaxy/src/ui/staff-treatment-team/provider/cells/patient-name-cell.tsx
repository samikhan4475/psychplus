'use client'

import { TextCell, type PropsWithRow } from '@/components'
import { getUserFullName } from '@/utils'
import { Patient } from '../types'

const PatientNameCell = ({
  row: { original: record },
}: PropsWithRow<Patient>) => {
  const name = getUserFullName(record?.patientName, true)
  return <TextCell className="px-1">{name}</TextCell>
}

export { PatientNameCell }
