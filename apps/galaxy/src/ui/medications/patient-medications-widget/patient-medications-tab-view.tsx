'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import {
  CURRENT_MEDICATIONS_TAB,
} from './constants'
import { PatientMedicationsDataTable } from './patient-medications-data-table'
import { PatientMedicationsTabContent } from './patient-medications-tab-content'

const PatientMedicationsTabView = () => {
  return (
    <Tabs.Root
      defaultValue={CURRENT_MEDICATIONS_TAB}
      className="flex w-full flex-col"
    >
      <Flex className="z-50">
        <Tabs.List>
          <TabsTrigger value={CURRENT_MEDICATIONS_TAB}>
            Current Medications
          </TabsTrigger>
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>

      <TabsContent value={CURRENT_MEDICATIONS_TAB}>
        <PatientMedicationsTabContent
          tabTitle="Current Medications"
        >
          <PatientMedicationsDataTable />
        </PatientMedicationsTabContent>
      </TabsContent>
    </Tabs.Root>
  )
}

const TabsContent = ({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) => (
  <Tabs.Content
    value={value}
    forceMount={value === CURRENT_MEDICATIONS_TAB ? true : undefined}
    className="hidden flex-1 flex-col gap-2 data-[state=active]:flex"
  >
    {children}
  </Tabs.Content>
)

export { PatientMedicationsTabView }
