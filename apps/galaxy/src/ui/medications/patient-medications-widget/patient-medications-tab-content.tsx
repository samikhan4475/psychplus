'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading, WidgetAddButton } from '@/components'
import { FilterForm } from '@/ui/medications/patient-medications-widget/filter-form'
import { NotesPrintButton } from '@/ui/notes/notes-print-button'
import { AddMedicationButton } from './add-medication-button'
import { SearchMedications } from './search-medications'

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
  return (
    <Flex id="patient-medications" direction="column">
      <TabContentHeading title={tabTitle} className="whitespace-nowrap">
        <Flex align="center" justify="between" width="100%">
          <SearchMedications />
          <Flex align="center" gap="2">
            <NotesPrintButton id="patient-medications" />
            <WidgetAddButton title="Add Medication">
              <AddMedicationButton scriptSureAppUrl={scriptSureAppUrl} />
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
