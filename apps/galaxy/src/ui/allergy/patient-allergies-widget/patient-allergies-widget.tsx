'use client'

import { WidgetAddButton, WidgetContainer } from '@/components'
import { FeatureFlag } from '@/types/feature-flag'
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
  featureFlags?: FeatureFlag[]
}

const PatientAllergiesWidget = ({
  patientId,
  isPatientAllergiesTab = false,
  scriptSureAppUrl,
  featureFlags,
}: PatientAllergiesWidgetProps) => {
  return (
    <StoreProvider patientId={patientId}>
      {isPatientAllergiesTab && (
        <>
          <PatientAllergiesHeader
            scriptSureAppUrl={scriptSureAppUrl}
            featureFlags={featureFlags}
          />
          <PatientAllergiesFilterForm patientId={patientId} />
        </>
      )}

      <WidgetContainer
        title={isPatientAllergiesTab ? '' : 'Allergies'}
        headerRight={
          !isPatientAllergiesTab && (
            <WidgetAddButton title="Add Allergies" className="max-w-[45vw]">
              {featureFlags?.[0]?.environments?.[0]?.isEnabledDefault ? (
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
