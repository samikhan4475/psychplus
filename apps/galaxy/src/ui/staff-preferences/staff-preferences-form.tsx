'use client'

import { usePathname } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { TabsTrigger } from '@/components'
import { AddOthersSettingBody } from '@/types'
import { StaffPreferencesAlertsView } from './alerts-view/staff-preferences-alerts-view'
import { addBulkPreferenceSettings } from './client-actions/add-bulk-preference-settings'
import { updateBulkPreferenceSettings } from './client-actions/update-bulk-preference-settings'
import { StaffPreferencesCoSignerInfoView } from './cosigner-info-view/staff-preferences-cosigner-info-view'
import { StaffPreferencesDashboard } from './dashboard/staff-preferences-dashboard'
import { StaffPreferencesPublicView } from './public-view/staff-preferences-public-view'
import { useStore } from './store'
import { transformSettingsToApprove } from './transform'
import { PreferenceTab } from './types'
import { StaffPreferencesVisitSettingsView } from './visits-settings-view/visit-settings-view'

const StaffPreferencesForm = ({
  userId,
  providerId,
}: {
  userId: number | undefined
  providerId: string
}) => {
  const pathName = usePathname()
  const isAdminView = pathName.includes(`${providerId ?? ''}`)
  const {
    activeTab,
    setActiveTab,
    fetchPreferences,
    mappedPreferences,
    visitTypes,
  } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
    fetchPreferences: state.fetchPreferences,
    mappedPreferences: state.mappedPreferences,
    visitTypes: state.visitTypes,
  }))

  const onSave = async ({
    dataToAdd,
    dataToUpdate,
  }: {
    dataToAdd: AddOthersSettingBody[]
    dataToUpdate: AddOthersSettingBody[]
  }) => {
    if (!userId) return
    const promises = []
    if (dataToAdd.length) {
      promises.push(addBulkPreferenceSettings(dataToAdd, userId))
    }
    if (dataToUpdate.length) {
      promises.push(updateBulkPreferenceSettings(dataToUpdate, userId))
    }

    const result = await Promise.all(promises)

    if (result.every((r) => r.state === 'success')) {
      toast.success('Preferences saved successfully')
      await fetchPreferences({ userId }, true)
    } else {
      const errorMessage = result.find((r) => r.state !== 'success')?.error
      toast.error(errorMessage ?? 'Error while adding settings')
    }
  }

  const onApprove = async (
    type: 'all' | 'public' | 'alert' | 'cosigner' | 'visit',
  ) => {
    if (!userId) return
    const dataToUpdate = transformSettingsToApprove(
      mappedPreferences,
      type,
      visitTypes,
    )
    const res = await updateBulkPreferenceSettings(dataToUpdate, userId)
    if (res.state === 'error') {
      return toast.error(res.error ?? 'Error while approving settings ')
    }
    toast.success('Preferences approved successfully')
    fetchPreferences({ userId })
  }

  return (
    <Box className="flex-1">
      <Tabs.Root
        defaultValue={PreferenceTab.PublicView}
        value={activeTab}
        onValueChange={(tab: string) => {
          setActiveTab(tab as PreferenceTab)
        }}
        className="flex w-full flex-col gap-0"
      >
        <Flex className="z-50">
          <Tabs.List>
            <TabsTrigger value={PreferenceTab.Dashboard}>
              {PreferenceTab.Dashboard}
            </TabsTrigger>
            <TabsTrigger value={PreferenceTab.PublicView}>
              {PreferenceTab.PublicView}
            </TabsTrigger>
            <TabsTrigger value={PreferenceTab.Alerts}>
              {PreferenceTab.Alerts}
            </TabsTrigger>
            <TabsTrigger value={PreferenceTab.CoSignerInfo}>
              {PreferenceTab.CoSignerInfo}
            </TabsTrigger>
            <TabsTrigger value={PreferenceTab.VisitSetting}>
              {PreferenceTab.VisitSetting}
            </TabsTrigger>
          </Tabs.List>
        </Flex>

        <TabsContent value={PreferenceTab.Dashboard}>
          <StaffPreferencesDashboard userId={userId} onApprove={onApprove} />
        </TabsContent>
        <TabsContent value={PreferenceTab.PublicView}>
          <StaffPreferencesPublicView
            isAdminView={isAdminView}
            userId={userId}
            onApprove={onApprove}
            onSave={onSave}
          />
        </TabsContent>
        <TabsContent value={PreferenceTab.Alerts}>
          <StaffPreferencesAlertsView
            isAdminView={isAdminView}
            userId={userId}
            onApprove={onApprove}
            onSave={onSave}
          />
        </TabsContent>
        <TabsContent value={PreferenceTab.CoSignerInfo}>
          <StaffPreferencesCoSignerInfoView
            isAdminView={isAdminView}
            userId={userId}
            onApprove={onApprove}
            onSave={onSave}
          />
        </TabsContent>
        <TabsContent value={PreferenceTab.VisitSetting}>
          <StaffPreferencesVisitSettingsView
            userId={userId}
            onApprove={onApprove}
            onSave={onSave}
          />
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
      className="hidden flex-1 flex-col gap-0 data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { StaffPreferencesForm }
