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
import { FeatureFlag } from '@/types/feature-flag'
import { AddMedication } from '../add-medication'
import { AddMedicationButton } from './add-medication-button'
import { PatientMedicationsDataTable } from './patient-medications-data-table'
import { PatientMedicationsTabView } from './patient-medications-tab-view'
import { SearchMedications } from './search-medications'
import { StoreProvider } from './store'

interface PatientMedicationsWidgetProps {
  scriptSureAppUrl: string
  featureFlags?: FeatureFlag[]
}

const PatientMedicationsWidget = ({
  scriptSureAppUrl,
  featureFlags,
}: PatientMedicationsWidgetProps) => {
  const handleCheckAllChange = () => {}
  const patientId = useParams().id as string
  const path = usePathname()
  const tabViewEnabled = path.includes('medications')
  return (
    <StoreProvider patientId={patientId}>
      {tabViewEnabled ? (
        <PatientMedicationsTabView
          scriptSureAppUrl={scriptSureAppUrl}
          featureFlags={featureFlags}
        />
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
                  {
                  featureFlags?.[0]?.environments?.[0]?.isEnabledDefault 
                  ? (
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
            <PatientMedicationsDataTable />
          </WidgetContainer>
        </Box>
      )}
    </StoreProvider>
  )
}

export { PatientMedicationsWidget }
