'use client'

import { WidgetContainer } from '@/components'
import { AddAllergyButton } from './add-allergy-button'
import { PatientAllergiesTable } from './patient-allergies-table'
import { StoreProvider } from './store'

interface PatientAllergiesWidgetProps {
  patientId: string
}

const PatientAllergiesWidget = ({ patientId }: PatientAllergiesWidgetProps) => {
  return (
    <StoreProvider patientId={patientId}>
      <WidgetContainer
        title="Allergies"
        headerRight={
          <>
            <AddAllergyButton />
          </>
        }
      >
        <PatientAllergiesTable />
      </WidgetContainer>
    </StoreProvider>
  )
}

export { PatientAllergiesWidget }
