'use client'

import { useEffect, useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { LoadingPlaceholder, TabsTrigger } from '@/components'
import { State } from '@/types'
import { getUsStatesAction } from '../visit/client-actions'
import { StateLicenseView } from './state-license'
import { useStore } from './store'
import { CredentialingTab } from './types'

const CredentialingTabs = () => {
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))
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
    <Tabs.Root
      defaultValue={CredentialingTab.StateLicense}
      value={activeTab}
      onValueChange={(tab) => {
        setActiveTab(tab as CredentialingTab)
      }}
      className="flex h-full w-full flex-col !overflow-hidden"
    >
      <Flex className="z-50">
        <Tabs.List>
          <TabsTrigger value={CredentialingTab.StateLicense}>
            <Text className="min-w-[60px]">
              {CredentialingTab.StateLicense}
            </Text>
          </TabsTrigger>
          <TabsTrigger value={CredentialingTab.DEA}>
            <Text className="min-w-[60px]">{CredentialingTab.DEA}</Text>
          </TabsTrigger>
          <TabsTrigger value={CredentialingTab.CDS}>
            <Text className="min-w-[60px]">{CredentialingTab.CDS}</Text>
          </TabsTrigger>
        </Tabs.List>
      </Flex>
      {loadingStates ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <>
          <TabsContent value={CredentialingTab.StateLicense}>
            <StateLicenseView states={states} loadingStates={loadingStates} />
          </TabsContent>
          <TabsContent value={CredentialingTab.DEA}>DEA</TabsContent>
          <TabsContent value={CredentialingTab.CDS}>CDS</TabsContent>
        </>
      )}
    </Tabs.Root>
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
