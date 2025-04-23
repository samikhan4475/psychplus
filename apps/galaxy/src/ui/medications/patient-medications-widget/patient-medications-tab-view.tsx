'use client'

import { Flex } from '@radix-ui/themes'
import { PatientMedicationTablePagination } from './patient-medication-table-pagination'
import { PatientMedicationsDataTable } from './patient-medications-data-table'
import { PatientMedicationsTabContent } from './patient-medications-tab-content'

interface PatientMedicationsTabViewProps {
  patientId: string
}
const PatientMedicationsTabView = ({
  patientId,
}: PatientMedicationsTabViewProps) => {
  return (
    <PatientMedicationsTabContent tabTitle="Medications" patientId={patientId}>
      <Flex
        direction="column"
        className="bg-white h-[calc(100dvh-376px)] !overflow-hidden"
      >
        <PatientMedicationsDataTable />
        <PatientMedicationTablePagination />
      </Flex>
    </PatientMedicationsTabContent>
  )
}

export { PatientMedicationsTabView }
