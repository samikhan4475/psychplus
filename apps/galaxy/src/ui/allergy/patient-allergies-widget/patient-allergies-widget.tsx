'use client'

import { WidgetContainer } from '@/components'
import { AddAllergyButton } from './add-allergy-button'
import { PatientAllergiesFilterForm } from './patient-allergies-filter-form'
import { PatientAllergiesHeader } from './patient-allergies-header'
import { PatientAllergiesTable } from './patient-allergies-table'
import { StoreProvider } from './store'

interface PatientAllergiesWidgetProps {
  patientId: string
  isPatientAllergiesTab?: boolean
}

const PatientAllergiesWidget = ({
  patientId,
  isPatientAllergiesTab = false,
}: PatientAllergiesWidgetProps) => {
  return (
    <StoreProvider patientId={patientId}>
      {isPatientAllergiesTab && (
        <>
          <PatientAllergiesHeader patientId={patientId} />
          <PatientAllergiesFilterForm patientId={patientId} />
        </>
      )}

      <WidgetContainer
        title={isPatientAllergiesTab ? '' : 'Allergies'}
        headerRight={!isPatientAllergiesTab && <AddAllergyButton />}
      >
        <PatientAllergiesTable />
      </WidgetContainer>
    </StoreProvider>
  )
}

export { PatientAllergiesWidget }
