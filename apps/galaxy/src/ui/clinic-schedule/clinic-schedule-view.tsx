'use client'

import { PropsWithChildren } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { TabsTrigger } from '@/components'
import { ClinicTimeTab } from './clinic-time-tab'
import { ClinicScheduleTabs } from './constants'
import { useStore } from './store'
import { VacationTimeTab } from './vacation-time-tab'

const ClinicScheduleView = () => {
  const { activeTab, setActiveTab } = useStore()

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex-1"
    >
      <Tabs.List className="mb-[3px]">
        <TabsTrigger value={ClinicScheduleTabs.ClinicTime}>
          Clinic Time
        </TabsTrigger>
        <TabsTrigger value={ClinicScheduleTabs.VacationTime}>
          Vacation Time
        </TabsTrigger>
        <TabsTrigger value={ClinicScheduleTabs.ForwardingInbox}>
          Forwarding Inbox
        </TabsTrigger>
      </Tabs.List>
      <TabsContent value={ClinicScheduleTabs.ClinicTime}>
        <ClinicTimeTab />
      </TabsContent>
      <TabsContent value={ClinicScheduleTabs.VacationTime}>
        <VacationTimeTab />
      </TabsContent>
      <TabsContent value={ClinicScheduleTabs.ForwardingInbox}>
        Forwarding Inbox
      </TabsContent>
    </Tabs.Root>
  )
}

const TabsContent = ({
  value,
  children,
}: PropsWithChildren<{ value: string }>) => {
  const { visitedTabs } = useStore()

  return (
    <Tabs.Content
      value={value}
      forceMount={visitedTabs.has(value) ? true : undefined}
      className="hidden flex-1 data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { ClinicScheduleView }
