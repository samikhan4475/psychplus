'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { QuickNoteSectionItem } from '@/types'
import { AimsTab } from './aims-tab'
import { AuditTab } from './audit-tab'
import {
  AIMS_TAB,
  AUDIT_TAB,
  DASHBOARD_TAB,
  DAST_10_TAB,
  GAD_7_TAB,
  HAM_D_TAB,
  MOCA_TAB,
  PCL_5_TAB,
  PHQ_9_TAB,
  SNAP_IV_TAB,
  Y_BOCS_TAB,
} from './constants'
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

const QuestionnairesView = ({
  questionnairesDashboardData,
  questionnairesSnapIvResponse,
  questionnairesGad7Response,
  questionnairesPcl5Response,
  questionnairesPhq9Response,
  questionnairesDast10Response,
  questionnairesAuditResponse,
  questionnairesAimsResponse,
  patientId,
}: {
  questionnairesDashboardData: QuickNoteSectionItem[]
  questionnairesGad7Response: QuickNoteSectionItem[]
  questionnairesPcl5Response: QuickNoteSectionItem[]
  questionnairesPhq9Response: QuickNoteSectionItem[]
  questionnairesSnapIvResponse: QuickNoteSectionItem[]
  questionnairesDast10Response: QuickNoteSectionItem[]
  questionnairesAuditResponse: QuickNoteSectionItem[]
  questionnairesAimsResponse: QuickNoteSectionItem[]
  patientId: string
}) => {
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
          <TabsTrigger value={DASHBOARD_TAB}>Dashboard</TabsTrigger>
          <TabsTrigger value={PHQ_9_TAB}>PHQ-9</TabsTrigger>
          <TabsTrigger value={GAD_7_TAB}>GAD-7</TabsTrigger>
          <TabsTrigger value={SNAP_IV_TAB}>SNAP-IV</TabsTrigger>
          <TabsTrigger value={PCL_5_TAB}>PCL-5</TabsTrigger>
          <TabsTrigger value={Y_BOCS_TAB}>Y-BOCS</TabsTrigger>
          <TabsTrigger value={AIMS_TAB}>AIMS</TabsTrigger>
          <TabsTrigger value={AUDIT_TAB}>AUDIT</TabsTrigger>
          <TabsTrigger value={DAST_10_TAB}>DAST-10</TabsTrigger>
          <TabsTrigger value={MOCA_TAB}>MOCA</TabsTrigger>
          <TabsTrigger value={HAM_D_TAB}>HAM-D</TabsTrigger>
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>
      <TabsContent value={DASHBOARD_TAB}>
        <DashboardTab
          patientId={patientId}
          questionnairesDashboardData={questionnairesDashboardData}
        />
      </TabsContent>
      <TabsContent value={PHQ_9_TAB}>
        <Phq9Tab patientId={patientId} data={questionnairesPhq9Response} />
      </TabsContent>
      <TabsContent value={GAD_7_TAB}>
        <Gad7Tab patientId={patientId} data={questionnairesGad7Response} />
      </TabsContent>
      <TabsContent value={SNAP_IV_TAB}>
        <SnapIvTab patientId={patientId} data={questionnairesSnapIvResponse} />
      </TabsContent>
      <TabsContent value={PCL_5_TAB}>
        <Pcl5Tab patientId={patientId} data={questionnairesPcl5Response} />
      </TabsContent>
      <TabsContent value={Y_BOCS_TAB}>
        <YBocsTab />
      </TabsContent>
      <TabsContent value={AIMS_TAB}>
        <AimsTab patientId={patientId} data={questionnairesAimsResponse} />
      </TabsContent>
      <TabsContent value={AUDIT_TAB}>
        <AuditTab patientId={patientId} data={questionnairesAuditResponse} />
      </TabsContent>
      <TabsContent value={DAST_10_TAB}>
        <Dast10Tab patientId={patientId} data={questionnairesDast10Response} />
      </TabsContent>
      <TabsContent value={MOCA_TAB}>
        <MocaTab />
      </TabsContent>
      <TabsContent value={HAM_D_TAB}>
        <HamDTab />
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

export { QuestionnairesView }
