'use client'

import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { Patient } from '@/ui/patient-lookup/types'

interface ActionsCellProps {
  row: Row<Patient>
}
const StatusCell = ({ row }: ActionsCellProps) => {
  const statusOptions = useCodesetOptions(CODESETS.CustomerStatus)
  const patientStatus = statusOptions?.find(
    (item) => item?.value === row.original?.status,
  )
  return <TextCell>{patientStatus?.label}</TextCell>
}
export { StatusCell }
