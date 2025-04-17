'use client'

import { useEffect } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { QuickNoteSectionItem } from '@/types'
import { AimsTab } from './aims-tab'
import { AuditTab } from './audit-tab'
import { CssrsTab } from './c-ssrs-tab'
import { QuestionnaireTabs } from './constants'
import { DashboardTab } from './dashboard-tab'
import { Dast10Tab } from './dast-10-tab'
import { Gad7Tab } from './gad-7-tab'
import { HamDTab } from './ham-d-tab'
import { MocaTab } from './moca-tab'
import { Pcl5Tab } from './pcl-5-tab'
import { Phq9Tab } from './phq-9-tab'
import { SnapIvTab } from './snap-iv-tab'
import { useStore } from './store'
import { YBocsTab } from './y-bocs-tab'

interface QuestionnairesViewProps {
  data: QuickNoteSectionItem[]
  patientId: string
}

const QuestionnairesView = ({ data, patientId }: QuestionnairesViewProps) => {
  const {
    activeQuestionnaireTab,
    setQuestionnaireActiveTab,
    initializeQuestionnaires,
  } = useStore((state) => ({
    activeQuestionnaireTab: state.activeQuestionnaireTab,
    setQuestionnaireActiveTab: state.setQuestionnaireActiveTab,
    initializeQuestionnaires: state.initializeQuestionnaires,
  }))

  useEffect(() => {
    initializeQuestionnaires(patientId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Tabs.Root
      className="flex w-full flex-col"
      value={activeQuestionnaireTab}
      onValueChange={setQuestionnaireActiveTab}
    >
      <Flex>
        <Tabs.List>
          <TabsTrigger value={QuestionnaireTabs.DASHBOARD_TAB}>
            {QuestionnaireTabs.DASHBOARD_TAB}
          </TabsTrigger>
          <TabsTrigger value={QuestionnaireTabs.PHQ_9_TAB}>
            {QuestionnaireTabs.PHQ_9_TAB}
          </TabsTrigger>
          <TabsTrigger value={QuestionnaireTabs.GAD_7_TAB}>
            {QuestionnaireTabs.GAD_7_TAB}
          </TabsTrigger>
          <TabsTrigger value={QuestionnaireTabs.SNAP_IV_TAB}>
            {QuestionnaireTabs.SNAP_IV_TAB}
          </TabsTrigger>
          <TabsTrigger value={QuestionnaireTabs.PCL_5_TAB}>
            {QuestionnaireTabs.PCL_5_TAB}
          </TabsTrigger>
          <TabsTrigger value={QuestionnaireTabs.Y_BOCS_TAB}>
            {QuestionnaireTabs.Y_BOCS_TAB}
          </TabsTrigger>
          <TabsTrigger value={QuestionnaireTabs.AIMS_TAB}>
            {QuestionnaireTabs.AIMS_TAB}
          </TabsTrigger>
          <TabsTrigger value={QuestionnaireTabs.AUDIT_TAB}>
            {QuestionnaireTabs.AUDIT_TAB}
          </TabsTrigger>
          <TabsTrigger value={QuestionnaireTabs.DAST_10_TAB}>
            {QuestionnaireTabs.DAST_10_TAB}
          </TabsTrigger>
          <TabsTrigger value={QuestionnaireTabs.MOCA_TAB}>
            {QuestionnaireTabs.MOCA_TAB}
          </TabsTrigger>
          <TabsTrigger value={QuestionnaireTabs.HAM_D_TAB}>
            {QuestionnaireTabs.HAM_D_TAB}
          </TabsTrigger>
          <TabsTrigger value={QuestionnaireTabs.C_SSRS_TAB}>
            {QuestionnaireTabs.C_SSRS_TAB}
          </TabsTrigger>
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>
      <TabsContent value={QuestionnaireTabs.DASHBOARD_TAB}>
        <DashboardTab patientId={patientId} data={data} />
      </TabsContent>
      <TabsContent value={QuestionnaireTabs.PHQ_9_TAB}>
        <Phq9Tab patientId={patientId} data={data} />
      </TabsContent>
      <TabsContent value={QuestionnaireTabs.GAD_7_TAB}>
        <Gad7Tab patientId={patientId} data={data} />
      </TabsContent>
      <TabsContent value={QuestionnaireTabs.SNAP_IV_TAB}>
        <SnapIvTab patientId={patientId} data={data} />
      </TabsContent>
      <TabsContent value={QuestionnaireTabs.PCL_5_TAB}>
        <Pcl5Tab patientId={patientId} data={data} />
      </TabsContent>
      <TabsContent value={QuestionnaireTabs.Y_BOCS_TAB}>
        <YBocsTab patientId={patientId} data={data} />
      </TabsContent>
      <TabsContent value={QuestionnaireTabs.AIMS_TAB}>
        <AimsTab patientId={patientId} data={data} />
      </TabsContent>
      <TabsContent value={QuestionnaireTabs.AUDIT_TAB}>
        <AuditTab patientId={patientId} data={data} />
      </TabsContent>
      <TabsContent value={QuestionnaireTabs.DAST_10_TAB}>
        <Dast10Tab patientId={patientId} data={data} />
      </TabsContent>
      <TabsContent value={QuestionnaireTabs.MOCA_TAB}>
        <MocaTab patientId={patientId} data={data} />
      </TabsContent>
      <TabsContent value={QuestionnaireTabs.HAM_D_TAB}>
        <HamDTab patientId={patientId} data={data} />
      </TabsContent>
      <TabsContent value={QuestionnaireTabs.C_SSRS_TAB}>
        <CssrsTab patientId={patientId} data={data} />
      </TabsContent>
    </Tabs.Root>
  )
}

const TabsTrigger = ({
  value,
  children,
  onClose,
}: {
  value: string
  children: React.ReactNode
  onClose?: () => void
}) => (
  <Tabs.Trigger
    value={value}
    className="data-[state=active]:border-b-white data-[state=active]:bg-white border border-l-0 border-accent-6 border-b-gray-5 bg-accent-4 p-0 px-2 py-1 text-[12px] text-gray-12 first:border-l data-[state=active]:cursor-default data-[state=active]:border-gray-5 data-[state=active]:font-[600] data-[state=active]:text-accent-12"
  >
    <Flex align="center" gap="2">
      {children}
      {onClose ? (
        <Flex
          align="center"
          justify="center"
          className="rounded-full hover:text-black h-[18px] w-[18px] cursor-pointer text-gray-11 transition-colors hover:bg-gray-3"
          onPointerDown={(e) => {
            e.preventDefault()
          }}
          onClick={onClose}
        >
          <XIcon width={14} height={14} strokeWidth={1.5} />
        </Flex>
      ) : null}
    </Flex>
  </Tabs.Trigger>
)

const TabsContent = ({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) => {
  const viewedTabs = useStore((state) => state.viewedQuestionnaireTabs)

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

export { QuestionnairesView }
