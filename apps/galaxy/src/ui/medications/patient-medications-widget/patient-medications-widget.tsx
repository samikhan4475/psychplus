'use client'

import { useEffect } from 'react'
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
import { AddMedication } from '../add-medication'
import { AddMedicationButton } from './add-medication-button'
import { PatientMedicationsDataTable } from './patient-medications-data-table'
import { PatientMedicationsTabView } from './patient-medications-tab-view'
import { SearchMedications } from './search-medications'
import { useStore } from './store'

const PatientMedicationsWidget = () => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const pathname = usePathname()
  const isQuickNoteView = pathname.includes('quicknotes')
  const patientId = useParams().id as string

  const { isPmpReviewed, setPmpReviewed, fetchPatientMedications, fetchScriptSureSessionToken } = useStore()

  useEffect(() => {
    if (!patientId) return;
    const fetchAllData = async () => {
      await Promise.all([
        fetchScriptSureSessionToken(),
        fetchPatientMedications(patientId, isQuickNoteView),
      ]);
    };
    fetchAllData();
  }, [patientId, fetchPatientMedications, fetchScriptSureSessionToken]);

  const path = usePathname()
  const tabViewEnabled = path.includes('medications')
  const fetchMedications = () => {
    fetchPatientMedications(patientId, isQuickNoteView)
  }

  return (
    <>
      {tabViewEnabled ? (
        <PatientMedicationsTabView />
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
                <WidgetAddButton
                  title="Add Medication"
                  onClose={fetchMedications}
                >
                  {!isFeatureFlagEnabled ? (
                    <AddMedication />
                  ) : (
                    <AddMedicationButton />
                  )}
                </WidgetAddButton>
                <Flex>
                  <CheckboxCell
                    label="PMP is reviewed"
                    checked={isPmpReviewed}
                    onCheckedChange={(checked) => setPmpReviewed(!!checked)}
                  />
                </Flex>
              </>
            }
          >
            <PatientMedicationsDataTable />
          </WidgetContainer>
        </Box>
      )}
    </>
  )
}

export { PatientMedicationsWidget }
