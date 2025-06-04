'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { TabsTrigger } from '@/components'
import { useStore as useGlobalStore } from '@/store'
import { getStaffAction } from '../staff-credentialing/actions'
import { CareTeamsView } from './care-teams/care-teams-view'
import { ProviderView } from './provider'
import { TreatmentTeamTab } from './types'
import { VisitsView } from './visits/visit-view'

const TreatmentTeamTabs = (props: { isProfileView?: boolean }) => {
  const params = useParams<{ id: string }>()
  const [providerType, setProviderType] = useState<string>('')
  const [loadingProviderType, setLoadingProviderType] = useState(false)
  const [activeTab, setActiveTab] = useState<TreatmentTeamTab>(
    TreatmentTeamTab.Care_Teams,
  )
  const [viewedTabs, setViewedTabs] = useState<Set<TreatmentTeamTab>>(
    new Set([TreatmentTeamTab.Care_Teams]),
  )
  const { user, providerTypeCodes } = useGlobalStore((state) => ({
    providerTypeCodes: state.codesets.ProviderType,
    user: state.user,
  }))

  const staffId =
    props.isProfileView && !params.id ? `${user.staffId}` : params.id || ''

  useEffect(() => {
    fetchStaffData()
  }, [])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as TreatmentTeamTab)
    setViewedTabs((prev) => new Set(prev).add(tab as TreatmentTeamTab))
  }

  const fetchStaffData = async () => {
    setLoadingProviderType(true)
    const result = await getStaffAction(staffId)
    setLoadingProviderType(false)
    if (result.state === 'error') {
      toast.error(result.error || 'Failed to fetch staff details')
      return
    }
    const staffSpecialistId = result.data?.staffSpecialistIds?.[0]?.toString()
    if (!staffSpecialistId) {
      toast.error('No Provider Type is found for this Provider')
      return
    }
    const providerType = providerTypeCodes.codes.find(
      (code) =>
        code.attributes?.find((attr) => attr.name === 'ResourceId')?.value ===
        staffSpecialistId,
    )
    setProviderType(providerType?.value ?? '')
  }

  return (
    <Box className="flex-1 px-1">
      <Tabs.Root
        defaultValue={TreatmentTeamTab.Care_Teams}
        value={activeTab}
        onValueChange={handleTabChange}
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
        <TabsContent
          value={TreatmentTeamTab.Care_Teams}
          viewedTabs={viewedTabs}
        >
          <CareTeamsView
            isProfileView={props.isProfileView}
            staffId={staffId}
          />
        </TabsContent>
        <TabsContent
          value={TreatmentTeamTab.Primary_Provider}
          viewedTabs={viewedTabs}
        >
          <ProviderView
            isPrimary={true}
            providerType={providerType}
            loadingProviderType={loadingProviderType}
          />
        </TabsContent>
        <TabsContent
          value={TreatmentTeamTab.Secondary_Provider}
          viewedTabs={viewedTabs}
        >
          <ProviderView
            isPrimary={false}
            providerType={providerType}
            loadingProviderType={loadingProviderType}
          />
        </TabsContent>
        <TabsContent value={TreatmentTeamTab.Visits} viewedTabs={viewedTabs}>
          <VisitsView isProfileView={props.isProfileView} staffId={staffId} />
        </TabsContent>
      </Tabs.Root>
    </Box>
  )
}

const TabsContent = ({
  value,
  viewedTabs,
  children,
}: {
  value: string
  viewedTabs: Set<string>
  children: React.ReactNode
}) => {
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
