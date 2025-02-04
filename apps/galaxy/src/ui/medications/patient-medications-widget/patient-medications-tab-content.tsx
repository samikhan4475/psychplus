'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading, WidgetAddButton } from '@/components'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { FilterForm } from '@/ui/medications/patient-medications-widget/filter-form'
import { NotesPrintButton } from '@/ui/notes/notes-print-button'
import { AddMedication } from '../add-medication'
import { AddMedicationButton } from './add-medication-button'
import { SearchMedications } from './search-medications'
import { useParams } from 'next/navigation'
import { useStore } from './store'

interface PatientMedicalTabProps {
  tabTitle: string
  children?: React.ReactNode
  scriptSureAppUrl: string
}

const PatientMedicationsTabContent = ({
  tabTitle,
  children,
  scriptSureAppUrl,
}: PatientMedicalTabProps) => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const patientId = useParams().id as string
  const { fetchPatientMedications } = useStore();
  const fetchMedications = () => {
    fetchPatientMedications(patientId);
  };
  return (
    <Flex id="patient-medications" direction="column">
      <TabContentHeading title={tabTitle} className="whitespace-nowrap">
        <Flex align="center" justify="between" width="100%">
          <SearchMedications />
          <Flex align="center" gap="2">
            <NotesPrintButton id="patient-medications" />
            <WidgetAddButton title="Add Medication" onClose={fetchMedications}>
              {!isFeatureFlagEnabled ? (
                <AddMedication />
              ) : (
                <AddMedicationButton scriptSureAppUrl={scriptSureAppUrl} />
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
