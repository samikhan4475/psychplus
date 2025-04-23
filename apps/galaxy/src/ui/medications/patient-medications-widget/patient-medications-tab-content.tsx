'use client'

import { PropsWithChildren } from 'react'
import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { FilterForm } from '@/ui/medications/patient-medications-widget/filter-form'
import { AddMedicationButton } from './add-medication-button'
import { PrintButton } from './print-button'
import { SearchMedications } from './search-medications'

interface PatientMedicationsTabContentProps {
  tabTitle: string
  patientId: string
}

const PatientMedicationsTabContent = ({
  tabTitle,
  patientId,
  children,
}: PropsWithChildren<PatientMedicationsTabContentProps>) => {
  return (
    <Flex id="patient-medications" direction="column" className="gap-1">
      <TabContentHeading title={tabTitle} className="gap-2">
        <Flex align="center" justify="between" width="100%">
          <SearchMedications />
          <Flex align="center" gap="2">
            <PrintButton id="patient-medications" />
            <AddMedicationButton />
          </Flex>
        </Flex>
      </TabContentHeading>
      <FilterForm patientId={patientId} />
      {children}
    </Flex>
  )
}

export { PatientMedicationsTabContent }
