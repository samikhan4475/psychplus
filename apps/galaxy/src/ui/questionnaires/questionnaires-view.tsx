'use client'

import { useEffect } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { QuickNoteSectionItem } from '@/types'
import { AdultAsrsTab } from './adult-asrs-tab'
import { AimsTab } from './aims-tab'
import { AuditTab } from './audit-tab'
import { BaiTab } from './bai-tab'
import { BdiTab } from './bdi-tab'
import { CssrsTab } from './c-ssrs-tab'
import { QuestionnaireTabs } from './constants'
import { CopsRTab } from './cops-r-tab'
import { DashboardTab } from './dashboard-tab'
import { Dast10Tab } from './dast-10-tab'
import { DesiiTab } from './des-ii-tab'
import { Gad7Tab } from './gad-7-tab'
import { GqAscTab } from './gq-asc-tab'
import { HamDTab } from './ham-d-tab'
import { MocaTab } from './moca-tab'
import { Pcl5Tab } from './pcl-5-tab'
import { Phq9Tab } from './phq-9-tab'
import { Psc17Tab } from './psc-17-tab'
import { SnapIvTab } from './snap-iv-tab'
import { useStore } from './store'
import { VadprsTab } from './vadprs-tab'
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

  const tabConfigs = [
    QuestionnaireTabs.DASHBOARD_TAB,
    QuestionnaireTabs.PHQ_9_TAB,
    QuestionnaireTabs.GAD_7_TAB,
    QuestionnaireTabs.SNAP_IV_TAB,
    QuestionnaireTabs.PCL_5_TAB,
    QuestionnaireTabs.Y_BOCS_TAB,
    QuestionnaireTabs.AIMS_TAB,
    QuestionnaireTabs.AUDIT_TAB,
    QuestionnaireTabs.DAST_10_TAB,
    QuestionnaireTabs.MOCA_TAB,
    QuestionnaireTabs.HAM_D_TAB,
    QuestionnaireTabs.C_SSRS_TAB,
    QuestionnaireTabs.PSC_17_TAB,
    QuestionnaireTabs.COPS_R_TAB,
    QuestionnaireTabs.VADPRS_TAB,
    QuestionnaireTabs.ADULT_ASRS_TAB,
    QuestionnaireTabs.GQ_ASC_TAB,
    QuestionnaireTabs.DES_II_TAB,
    QuestionnaireTabs.BAI_TAB,
    QuestionnaireTabs.BDI_TAB,
  ].map((q) => ({ label: q, value: q }))

  const tabComponents = {
    [QuestionnaireTabs.DASHBOARD_TAB]: DashboardTab,
    [QuestionnaireTabs.PHQ_9_TAB]: Phq9Tab,
    [QuestionnaireTabs.GAD_7_TAB]: Gad7Tab,
    [QuestionnaireTabs.SNAP_IV_TAB]: SnapIvTab,
    [QuestionnaireTabs.PCL_5_TAB]: Pcl5Tab,
    [QuestionnaireTabs.Y_BOCS_TAB]: YBocsTab,
    [QuestionnaireTabs.AIMS_TAB]: AimsTab,
    [QuestionnaireTabs.AUDIT_TAB]: AuditTab,
    [QuestionnaireTabs.DAST_10_TAB]: Dast10Tab,
    [QuestionnaireTabs.MOCA_TAB]: MocaTab,
    [QuestionnaireTabs.HAM_D_TAB]: HamDTab,
    [QuestionnaireTabs.C_SSRS_TAB]: CssrsTab,
    [QuestionnaireTabs.PSC_17_TAB]: Psc17Tab,
    [QuestionnaireTabs.COPS_R_TAB]: CopsRTab,
    [QuestionnaireTabs.VADPRS_TAB]: VadprsTab,
    [QuestionnaireTabs.ADULT_ASRS_TAB]: AdultAsrsTab,
    [QuestionnaireTabs.GQ_ASC_TAB]: GqAscTab,
    [QuestionnaireTabs.DES_II_TAB]: DesiiTab,
    [QuestionnaireTabs.BAI_TAB]: BaiTab,
    [QuestionnaireTabs.BDI_TAB]: BdiTab,
  }

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
          {tabConfigs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>
      {tabConfigs.map((tab) => {
        const TabComponent = tabComponents[tab.value]
        return (
          <TabsContent key={tab.value} value={tab.value}>
            <TabComponent patientId={patientId} data={data} />
          </TabsContent>
        )
      })}
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
