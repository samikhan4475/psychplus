'use client'

import { useParams } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { useStore as useGlobalStore } from '@/store'
import { CareTeamsView } from './care-teams/care-teams-view'
import { useStore } from './store'
import { TreatmentTeamTab } from './types'
import { VisitsView } from './visits/visit-view'

const TreatmentTeamTabs = (props: { isProfileView?: boolean }) => {
  const params = useParams<{ id: string }>()
  const { user } = useGlobalStore((state) => ({ user: state.user }))
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))
  const staffId =
    props.isProfileView && !params.id ? `${user.staffId}` : params.id || ''

  return (
    <Box className="flex-1 px-1">
      <Tabs.Root
        defaultValue={TreatmentTeamTab.Care_Teams}
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex w-full flex-col"
      >
        <Flex className="z-50">
          <Tabs.List>
            <TabsTrigger value={TreatmentTeamTab.Care_Teams}>
              {TreatmentTeamTab.Care_Teams}
            </TabsTrigger>
            <TabsTrigger value={TreatmentTeamTab.Primary_Provider}>
              {TreatmentTeamTab.Primary_Provider}
            </TabsTrigger>
            <TabsTrigger value={TreatmentTeamTab.Secondary_Provider}>
              {TreatmentTeamTab.Secondary_Provider}
            </TabsTrigger>
            <TabsTrigger value={TreatmentTeamTab.Visits}>
              {TreatmentTeamTab.Visits}
            </TabsTrigger>
          </Tabs.List>
        </Flex>
        <TabsContent value={TreatmentTeamTab.Care_Teams}>
          <CareTeamsView
            isProfileView={props.isProfileView}
            staffId={staffId}
          />
        </TabsContent>
        <TabsContent value={TreatmentTeamTab.Visits}>
          <VisitsView isProfileView={props.isProfileView} staffId={staffId} />
        </TabsContent>
      </Tabs.Root>
    </Box>
  )
}

const TabsContent = ({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) => {
  const viewedTabs = useStore((state) => state.viewedTabs)
  return (
    <Tabs.Content
      forceMount={viewedTabs.has(value) ? true : undefined}
      value={value}
      className="hidden flex-1 flex-col gap-2 data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { TreatmentTeamTabs }
