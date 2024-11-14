'use client'

import { useParams } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { FamilyPsychHxWidget } from '../family-psych-hx/family-psych-hx-widget/family-psych-hx-widget'
import { PastMedicalHxWidget } from '../past-medical-hx/past-medical-hx-widget/past-medical-hx-widget'
import { PastPsychHxWidget } from '../past-psych-hx/past-psych-hx-widget/past-psych-hx-widget'
import { SocialHxWidget } from '../social-hx/social-hx-widget/social-hx-widget'
import { SubstanceUseHxWidget } from '../substance-use-hx/substance-use-hx-widget/substance-use-widget'
import { HistoryTabs } from './constant'
import { useStore } from './store'

const HistoryView = ({
  pastPsychHxData,
  familyPsychHxData,
  medicalPsychHxData,
  substanceUseHxData,
  socialHxData,
}: any) => {
  const { id } = useParams<{ id: string }>()
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))

  return (
    <Tabs.Root
      className="flex w-full flex-col"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <Flex>
        <Tabs.List>
          <TabsTrigger value={HistoryTabs.PPH}>{HistoryTabs.PPH}</TabsTrigger>
          <TabsTrigger value={HistoryTabs.PMH}>{HistoryTabs.PMH}</TabsTrigger>
          <TabsTrigger value={HistoryTabs.FH}>{HistoryTabs.FH}</TabsTrigger>
          <TabsTrigger value={HistoryTabs.SH}>{HistoryTabs.SH}</TabsTrigger>
          <TabsTrigger value={HistoryTabs.SUH}>{HistoryTabs.SUH}</TabsTrigger>
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>
      <TabsContent value={HistoryTabs.PPH}>
        <PastPsychHxWidget
          patientId={id}
          initialValue={pastPsychHxData}
          isHistoryHeader={true}
        />
      </TabsContent>
      <TabsContent value={HistoryTabs.PMH}>
        <PastMedicalHxWidget
          patientId={id}
          initialValue={medicalPsychHxData}
          isHistoryHeader={true}
        />
      </TabsContent>
      <TabsContent value={HistoryTabs.FH}>
        <FamilyPsychHxWidget
          patientId={id}
          initialValue={familyPsychHxData}
          isHistoryHeader={true}
        />
      </TabsContent>
      <TabsContent value={HistoryTabs.SH}>
        <SocialHxWidget
          patientId={id}
          initialValue={socialHxData}
          isHistoryHeader={true}
        />
      </TabsContent>
      <TabsContent value={HistoryTabs.SUH}>
        <SubstanceUseHxWidget
          patientId={id}
          initialValue={substanceUseHxData}
          isHistoryHeader={true}
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
}) => {
  const viewedTabs = useStore((state) => state.viewedTabs)

  return (
    <Tabs.Content
      value={value}
      forceMount={viewedTabs.has(value) ? true : undefined}
      className="hidden flex-1 flex-col gap-2 overflow-auto data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { HistoryView }
