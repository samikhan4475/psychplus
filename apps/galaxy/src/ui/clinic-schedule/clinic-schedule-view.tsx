'use client'

import { PropsWithChildren } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { TabsTrigger } from '@/components'
import { useStore as useGlobalStore } from '@/store'
import { ClinicTimeTab } from './clinic-time-tab'
import { ClinicScheduleTabs } from './constants'
import { ForwardingMessageTab } from './forwarding-message-tab'
import { useStore } from './store'
import { VacationTimeTab } from './vacation-time-tab'

interface ClinicScheduleViewProps {
  userId?: string
  staffId?: string
  isProfileView?: boolean
}

const ClinicScheduleView = (props: ClinicScheduleViewProps) => {
  const { activeTab, setActiveTab } = useStore()
  const { user } = useGlobalStore((state) => ({ user: state.user }))

  const userId = props.isProfileView ? user.id : props.userId
  const staffId = props.isProfileView ? `${user.staffId}` : props.staffId || ''

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
          Forwarding Message
        </TabsTrigger>
      </Tabs.List>
      <TabsContent value={ClinicScheduleTabs.ClinicTime}>
        <ClinicTimeTab />
      </TabsContent>
      <TabsContent value={ClinicScheduleTabs.VacationTime}>
        <VacationTimeTab staffId={staffId} />
      </TabsContent>
      <TabsContent value={ClinicScheduleTabs.ForwardingInbox}>
        <ForwardingMessageTab userId={Number(userId)} />
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
