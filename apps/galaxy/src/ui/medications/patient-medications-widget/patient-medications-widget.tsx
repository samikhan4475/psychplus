'use client'

import { Fragment, useEffect } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { Box, Flex } from '@radix-ui/themes'
import {
  CheckboxCell,
  WidgetClearButton,
  WidgetContainer,
  WidgetSaveButton,
} from '@/components'
import { AddMedicationButton } from './add-medication-button'
import { PatientMedicationsDataTable } from './patient-medications-data-table'
import { PatientMedicationsTabView } from './patient-medications-tab-view'
import { SearchMedications } from './search-medications'
import { useStore } from './store'

const PatientMedicationsWidget = () => {
  const { id: patientId = '' } = useParams<{ id: string }>()
  const pathname = usePathname()
  const isQuickNoteSection = pathname.includes('quicknotes')

  const {
    isPmpReviewed,
    setPmpReviewed,
    fetchPatientMedication,
    fetchScriptSureSessionToken,
  } = useStore()

  useEffect(() => {
    if (!patientId) return
    Promise.all([
      fetchScriptSureSessionToken(),
      fetchPatientMedication(
        { patientIds: [Number(patientId)] },
        1,
        true,
        isQuickNoteSection,
      ),
    ])
  }, [patientId, fetchPatientMedication, fetchScriptSureSessionToken])

  const path = usePathname()
  const tabViewEnabled = path.includes('medications')

  if (tabViewEnabled) {
    return <PatientMedicationsTabView patientId={patientId} />
  }
  return (
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
          <Fragment>
            <SearchMedications />
            <AddMedicationButton />
            <Flex>
              <CheckboxCell
                label="PMP is reviewed"
                checked={isPmpReviewed}
                onCheckedChange={(checked) => setPmpReviewed(!!checked)}
              />
            </Flex>
          </Fragment>
        }
      >
        <PatientMedicationsDataTable />
      </WidgetContainer>
    </Box>
  )
}

export { PatientMedicationsWidget }
