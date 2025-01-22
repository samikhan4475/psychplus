'use client'

import { WidgetAddButton, WidgetContainer } from '@/components'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { AddAllergy } from './add-allergy'
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
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
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
            <WidgetAddButton title="Add Allergies" className="max-w-[45vw]">
              {isFeatureFlagEnabled ? (
                <AddAllergy />
              ) : (
                <AddAllergyButton scriptSureAppUrl={scriptSureAppUrl} />
              )}
            </WidgetAddButton>
          )
        }
      >
        <PatientAllergiesTable />
      </WidgetContainer>
    </StoreProvider>
  )
}

export { PatientAllergiesWidget }
