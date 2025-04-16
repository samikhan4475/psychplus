'use client'

import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { TabContentHeading, WidgetAddButton } from '@/components'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { FilterForm } from '@/ui/medications/patient-medications-widget/filter-form'
import { AddMedication } from '../add-medication'
import { AddMedicationButton } from './add-medication-button'
import { PrintButton } from './print-button'
import { SearchMedications } from './search-medications'
import { useStore } from './store'

interface PatientMedicalTabProps {
  tabTitle: string
  children?: React.ReactNode
}

const PatientMedicationsTabContent = ({
  tabTitle,
  children,
}: PatientMedicalTabProps) => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const patientId = useParams().id as string
  const fetchPatientMedications = useStore(
    (state) => state.fetchPatientMedications,
  )
  const fetchMedications = () => {
    fetchPatientMedications(patientId)
  }
  return (
    <Flex id="patient-medications" direction="column">
      <TabContentHeading title={tabTitle} className="whitespace-nowrap">
        <Flex align="center" justify="between" width="100%">
          <SearchMedications />
          <Flex align="center" gap="2">
            <PrintButton id="patient-medications" />
            <WidgetAddButton title="Add Medication" onClose={fetchMedications}>
              {!isFeatureFlagEnabled ? (
                <AddMedication />
              ) : (
                <AddMedicationButton />
              )}
            </WidgetAddButton>
          </Flex>
        </Flex>
      </TabContentHeading>
      <FilterForm />
      {children}
    </Flex>
  )
}

export { PatientMedicationsTabContent }
