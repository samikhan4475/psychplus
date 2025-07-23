'use client'

import { PropsWithChildren } from 'react'
import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { FilterForm } from '@/ui/medications/patient-medications-widget/filter-form'
import { AddMedicationButton } from './add-medication-button'
import { PrintButton } from './print-button'
import { useStore } from './store'

interface PatientMedicationsTabContentProps {
  tabTitle: string
  patientId: string
}

const PatientMedicationsTabContent = ({
  tabTitle,
  patientId,
  children,
}: PropsWithChildren<PatientMedicationsTabContentProps>) => {
  const { refetch } = useStore((state) => ({
    refetch: state.refetch,
  }))
  return (
    <Flex id="patient-medications" direction="column" className="gap-1">
      <TabContentHeading title={tabTitle} className="gap-2">
          <Flex justify="end" align="center" gap="2" ml="auto">
            <PrintButton id="patient-medications" />
            <AddMedicationButton onRefresh={refetch} />
          </Flex>
      </TabContentHeading>
      <FilterForm patientId={patientId} />
      {children}
    </Flex>
  )
}

export { PatientMedicationsTabContent }
