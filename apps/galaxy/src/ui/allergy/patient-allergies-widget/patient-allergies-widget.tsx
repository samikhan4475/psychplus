'use client'

import { useEffect, useState } from 'react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Box } from '@radix-ui/themes'
import { WidgetAddButton, WidgetContainer } from '@/components'
import { ACCESS_UNAVAILABLE_MESSAGE, FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { AddAllergy } from './add-allergy'
import { AddAllergyButton } from './add-allergy-button'
import { ALLERGIES_ERROR_MESSAGE } from './constants'
import { PatientAllergiesFilterForm } from './patient-allergies-filter-form'
import { PatientAllergiesHeader } from './patient-allergies-header'
import { PatientAllergiesTable } from './patient-allergies-table'
import { ShowAllergiesError } from './show-allergy-error'
import { useStore } from './store'

interface PatientAllergiesWidgetProps {
  patientId: string
  scriptSureAppUrl: string
  appointmentId?: string
  isPatientAllergiesTab?: boolean
}

const PatientAllergiesWidget = ({
  patientId,
  isPatientAllergiesTab = false,
  appointmentId,
  scriptSureAppUrl,
}: PatientAllergiesWidgetProps) => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const {
    allergiesListSearch,
    allergiesError,
    allergiesListError,
    allergiesListStatus,
  } = useStore()
  const [showAllergyPopup, setShowAllergyPopup] = useState(true)

  useEffect(() => {
    allergiesListSearch(patientId)
  }, [patientId])

  const fetchAllergies = () => {
    allergiesListSearch(patientId)
  }

  useEffect(() => {
    if (!showAllergyPopup) {
      fetchAllergies()
      setShowAllergyPopup(true)
    }
  }, [showAllergyPopup])

  if (allergiesListError && allergiesListStatus === 401) {
    return (
      <WidgetContainer
        title="Allergies Access Unavailable"
        titleIcon={<ExclamationTriangleIcon className="text-pp-orange-1" />}
      >
        <Box className="p-2">{ACCESS_UNAVAILABLE_MESSAGE}</Box>
      </WidgetContainer>
    )
  }

  return (
    <>
      {isPatientAllergiesTab && (
        <>
          <PatientAllergiesHeader
            scriptSureAppUrl={scriptSureAppUrl}
            patientId={patientId}
            appointmentId={appointmentId}
          />
          <PatientAllergiesFilterForm patientId={patientId} />
        </>
      )}

      <WidgetContainer
        title={isPatientAllergiesTab ? '' : 'Allergies'}
        headerRight={
          !isPatientAllergiesTab &&
          showAllergyPopup && (
            <WidgetAddButton
              title="Add Allergies"
              className="max-w-[45vw]"
              onClose={fetchAllergies}
              stickyHeader
            >
              {!isFeatureFlagEnabled ? (
                <AddAllergy
                  patientId={patientId}
                  appointmentId={appointmentId}
                  onCloseAddAllergy={() => setShowAllergyPopup(false)}
                />
              ) : (
                <AddAllergyButton scriptSureAppUrl={scriptSureAppUrl} />
              )}
            </WidgetAddButton>
          )
        }
      >
        <PatientAllergiesTable scriptSureAppUrl={scriptSureAppUrl} />
        {!isPatientAllergiesTab && allergiesError && (
          <ShowAllergiesError errorMessage={ALLERGIES_ERROR_MESSAGE} />
        )}
      </WidgetContainer>
    </>
  )
}

export { PatientAllergiesWidget }
