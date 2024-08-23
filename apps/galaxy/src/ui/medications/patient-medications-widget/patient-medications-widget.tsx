'use client'

import {
  WidgetClearButton,
  WidgetContainer,
  WidgetHxButton,
  WidgetSaveButton,
} from '@/components'
import { AddMedicationButton } from './add-medication-button'
import { PatientMedicationsTable } from './patient-medications-table'
import { StoreProvider } from './store'

interface PatientAllergiesWidgetProps {
  patientId: string
}

const PatientMedicationsWidget = ({ patientId }: PatientAllergiesWidgetProps) => {
  return (
    <StoreProvider patientId={patientId}>
      <WidgetContainer
        title="Medications"
        headerLeft={
          <>
            <AddMedicationButton />
          </>
        }
        headerRight={
          <>
            <WidgetHxButton />
            <WidgetClearButton />
            <WidgetSaveButton />
          </>
        }
      >
        <PatientMedicationsTable />
      </WidgetContainer>
    </StoreProvider>
  )
}

export { PatientMedicationsWidget }
