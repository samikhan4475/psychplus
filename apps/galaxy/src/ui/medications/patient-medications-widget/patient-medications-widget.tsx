'use client'

import { Fragment, useEffect } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Box, Flex } from '@radix-ui/themes'
import {
  CheckboxCell,
  WidgetClearButton,
  WidgetContainer,
  WidgetSaveButton,
} from '@/components'
import { ACCESS_UNAVAILABLE_MESSAGE } from '@/constants'
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
    fetchExternalScriptsurePatientId,
    error,
    errorStatus,
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
      fetchExternalScriptsurePatientId(patientId),
    ])
  }, [patientId])

  const path = usePathname()
  const tabViewEnabled = path.includes('medications')

  if (error && errorStatus === 401) {
    return (
      <WidgetContainer
        title="Medication Access Unavailable"
        titleIcon={<ExclamationTriangleIcon className="text-pp-orange-1" />}
      >
        <Box className="p-2">{ACCESS_UNAVAILABLE_MESSAGE}</Box>
      </WidgetContainer>
    )
  }

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
