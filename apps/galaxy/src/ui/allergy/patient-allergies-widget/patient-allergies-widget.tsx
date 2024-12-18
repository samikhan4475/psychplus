'use client'

import { WidgetAddButton, WidgetContainer } from '@/components'
import { AddAllergyButton } from './add-allergy-button'
import { PatientAllergiesFilterForm } from './patient-allergies-filter-form'
import { PatientAllergiesHeader } from './patient-allergies-header'
import { PatientAllergiesTable } from './patient-allergies-table'
import { StoreProvider } from './store'

interface PatientAllergiesWidgetProps {
  patientId: string
  isPatientAllergiesTab?: boolean
  scriptSureAppUrl: string
}

const PatientAllergiesWidget = ({
  patientId,
  isPatientAllergiesTab = false,
  scriptSureAppUrl,
}: PatientAllergiesWidgetProps) => {
  return (
    <StoreProvider patientId={patientId}>
      {isPatientAllergiesTab && (
        <>
          <PatientAllergiesHeader scriptSureAppUrl={scriptSureAppUrl} />
          <PatientAllergiesFilterForm patientId={patientId} />
        </>
      )}

      <WidgetContainer
        title={isPatientAllergiesTab ? '' : 'Allergies'}
        headerRight={
          !isPatientAllergiesTab && (
            <>
              <WidgetAddButton title="Add Allergy1">
                <AddAllergyButton scriptSureAppUrl={scriptSureAppUrl} />
              </WidgetAddButton>
            </>
          )
        }
      >
        <PatientAllergiesTable />
      </WidgetContainer>
    </StoreProvider>
  )
}

export { PatientAllergiesWidget }
