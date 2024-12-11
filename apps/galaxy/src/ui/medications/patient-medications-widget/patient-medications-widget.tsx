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
import { AddMedicationButton } from './add-medication-button'
import { PatientMedicationsDataTable } from './patient-medications-data-table'
import { PatientMedicationsTabView } from './patient-medications-tab-view'
import { SearchMedications } from './search-medications'
import { StoreProvider } from './store'

interface PatientMedicationsWidgetProps {
  scriptSureAppUrl: string
}

const PatientMedicationsWidget = ({
  scriptSureAppUrl,
}: PatientMedicationsWidgetProps) => {
  const handleCheckAllChange = () => {}
  const patientId = useParams().id as string
  const path = usePathname()
  const tabViewEnabled = path.includes('medications')
  return (
    <StoreProvider patientId={patientId}>
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
                <WidgetAddButton title="Add Medication">
                  <AddMedicationButton scriptSureAppUrl={scriptSureAppUrl} />
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
            <PatientMedicationsDataTable />
          </WidgetContainer>
        </Box>
      )}
    </StoreProvider>
  )
}

export { PatientMedicationsWidget }
