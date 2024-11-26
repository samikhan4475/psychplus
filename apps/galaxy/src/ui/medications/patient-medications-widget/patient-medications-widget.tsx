'use client'

import {
  WidgetAddButton,
  WidgetClearButton,
  WidgetContainer,
  WidgetHxButton,
  WidgetSaveButton,
} from '@/components'
import { AddMedicationButton } from './add-medication-button'
import { PatientMedicationsTable } from './patient-medications-table'
import { StoreProvider } from './store'

interface PatientMedicationsWidgetProps {
  patientId: string
  scriptSureAppUrl: string
}

const PatientMedicationsWidget = ({
  patientId,
  scriptSureAppUrl,
}: PatientMedicationsWidgetProps) => {
  return (
    <StoreProvider patientId={patientId}>
      <WidgetContainer
        title="Medications"
        headerLeft={
          <>
            <WidgetAddButton title="Add Medication">
              <AddMedicationButton scriptSureAppUrl={scriptSureAppUrl} />
            </WidgetAddButton>
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
