'use client'

import { Row } from '@tanstack/react-table'
import { Patient } from '@/ui/patient-lookup/types'
import { PatientCardDialog } from '../patient-card/patient-card-dialog'

interface ActionsCellProps {
  row: Row<Patient>
  patientId: string
}
const ActionCell = ({ row, patientId }: ActionsCellProps) => {
  return (
    <PatientCardDialog
      survivorPatientId={patientId}
      nonSurvivorPatientId={row?.original.id.toString()}
    />
  )
}
export { ActionCell }
