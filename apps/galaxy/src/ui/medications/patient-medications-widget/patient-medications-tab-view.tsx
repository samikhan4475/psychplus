'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { FeatureFlag } from '@/types/feature-flag'
import {
  CURRENT_MEDICATIONS_TAB,
  EXTERNAL_MEDICATIONS_TAB,
  HOME_MEDICATIONS_TAB,
} from './constants'
import { PatientMedicationsDataTable } from './patient-medications-data-table'
import { PatientMedicationsTabContent } from './patient-medications-tab-content'

interface PatientMedicationsTabViewProps {
  scriptSureAppUrl: string
}
const PatientMedicationsTabView = ({
  scriptSureAppUrl,
}: PatientMedicationsTabViewProps) => {
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
          <TabsTrigger value={HOME_MEDICATIONS_TAB} disabled>
            Home Medications
          </TabsTrigger>
          <TabsTrigger value={EXTERNAL_MEDICATIONS_TAB} disabled>
            External Medications
          </TabsTrigger>
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>

      <TabsContent value={CURRENT_MEDICATIONS_TAB}>
        <PatientMedicationsTabContent
          tabTitle="Current Medications"
          scriptSureAppUrl={scriptSureAppUrl}
        >
          <PatientMedicationsDataTable />
        </PatientMedicationsTabContent>
      </TabsContent>
      <TabsContent value={HOME_MEDICATIONS_TAB}>
        <PatientMedicationsTabContent
          tabTitle="Home Medications"
          scriptSureAppUrl={scriptSureAppUrl}
        />
      </TabsContent>
      <TabsContent value={EXTERNAL_MEDICATIONS_TAB}>
        <PatientMedicationsTabContent
          tabTitle="External Medications"
          scriptSureAppUrl={scriptSureAppUrl}
        />
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
