'use client'

import { useEffect, useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { LoadingPlaceholder, TabsTrigger } from '@/components'
import { State } from '@/types'
import { getUsStatesAction } from '../visit/client-actions'
import { CDSView } from './cds'
import { DEAView } from './dea'
import { LicenseView } from './license'
import { LicenseHistory } from './license-history'
import { PrescriberSettingsView } from './prescriber-settings'
import { useStore } from './store'
import { CredentialingTab } from './types'

const CredentialingTabs = ({ staffId }: { staffId: string }) => {
  const { activeTab, setActiveTab, setEditingRow } = useStore((state) => state)
  const [states, setStates] = useState<State[]>([])
  const [loadingStates, setLoadingStates] = useState<boolean>(false)
  useEffect(() => {
    setLoadingStates(true)
    getUsStatesAction().then((res) => {
      setLoadingStates(false)
      if (res.state === 'error')
        return toast.error(res.error || 'Failed to fetch states')
      setStates(res.data)
    })
  }, [])

  return (
    <Box className="flex-1 px-1">
      <Tabs.Root
        defaultValue={CredentialingTab.License}
        value={activeTab}
        onValueChange={(tab) => {
          setActiveTab(tab)
          setEditingRow(null)
        }}
        className="flex w-full flex-col"
      >
        <LicenseHistory staffId={staffId} />

        <Flex className="z-50">
          <Tabs.List>
            <TabsTrigger value={CredentialingTab.License}>
              {CredentialingTab.License}
            </TabsTrigger>
            <TabsTrigger value={CredentialingTab.DEA}>
              {CredentialingTab.DEA}
            </TabsTrigger>
            <TabsTrigger value={CredentialingTab.CDS}>
              {CredentialingTab.CDS}
            </TabsTrigger>
            <TabsTrigger value={CredentialingTab.PrescriberSettings}>
              {CredentialingTab.PrescriberSettings}
            </TabsTrigger>
          </Tabs.List>
        </Flex>
        {loadingStates ? (
          <LoadingPlaceholder className="bg-white min-h-[46vh]" />
        ) : (
          <>
            <TabsContent value={CredentialingTab.License}>
              <LicenseView
                staffId={staffId}
                states={states}
                loadingStates={loadingStates}
              />
            </TabsContent>
            <TabsContent value={CredentialingTab.DEA}>
              <DEAView
                staffId={staffId}
                states={states}
                loadingStates={loadingStates}
              />
            </TabsContent>
            <TabsContent value={CredentialingTab.CDS}>
              <CDSView
                staffId={staffId}
                states={states}
                loadingStates={loadingStates}
              />
            </TabsContent>
            <TabsContent value={CredentialingTab.PrescriberSettings}>
              <PrescriberSettingsView states={states} />
            </TabsContent>
          </>
        )}
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

export { CredentialingTabs }
