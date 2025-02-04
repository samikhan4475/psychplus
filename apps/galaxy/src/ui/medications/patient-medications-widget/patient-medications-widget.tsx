'use client'

import { useParams, usePathname } from 'next/navigation'
import { Box, Flex } from '@radix-ui/themes'
import {
  CheckboxCell,
  WidgetAddButton,
  WidgetClearButton,
  WidgetContainer,
  WidgetSaveButton,
} from '@/components'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { FeatureFlag } from '@/types/feature-flag'
import { AddMedication } from '../add-medication'
import { AddMedicationButton } from './add-medication-button'
import { PatientMedicationsDataTable } from './patient-medications-data-table'
import { PatientMedicationsTabView } from './patient-medications-tab-view'
import { SearchMedications } from './search-medications'
import { useStore } from './store'
import { useEffect } from 'react'

interface PatientMedicationsWidgetProps {
  scriptSureAppUrl: string
}

const PatientMedicationsWidget = ({
  scriptSureAppUrl,
}: PatientMedicationsWidgetProps) => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const patientId = useParams().id as string
  const { fetchPatientMedications } = useStore();
  useEffect(() => {
    if (patientId) {
      fetchPatientMedications(patientId);
    }
  }, [patientId, fetchPatientMedications]);
  const handleCheckAllChange = () => { }
  const path = usePathname()
  const tabViewEnabled = path.includes('medications')
  const fetchMedications = () => {
    fetchPatientMedications(patientId);
  };
  return (
    <>
      {tabViewEnabled ? (
        <PatientMedicationsTabView scriptSureAppUrl={scriptSureAppUrl} />
      ) : (
        <Box position="relative" width="100%">
          <WidgetContainer
            title="Medications"
            headerRight={
              <>
                <WidgetClearButton />
                <WidgetSaveButton />
              </>
            }
            headerLeft={
              <>
                <SearchMedications />
                <WidgetAddButton title="Add Medication" onClose={fetchMedications}>
                  {!isFeatureFlagEnabled ? (
                    <AddMedication />
                  ) : (
                    <AddMedicationButton scriptSureAppUrl={scriptSureAppUrl} />
                  )}
                </WidgetAddButton>
                <Flex>
                  <CheckboxCell
                    label="PMP is reviewed"
                    checked={false}
                    onCheckedChange={handleCheckAllChange}
                  />
                </Flex>
              </>
            }
          >
            <PatientMedicationsDataTable scriptSureAppUrl={scriptSureAppUrl}/>
          </WidgetContainer>
        </Box>
      )}
    </>
  )
}

export { PatientMedicationsWidget }
