'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { AddOnView } from './add-onassessment-plan-tab/add-on-view'
import { AlertDialog } from './alert-dialog'
import { AssessmentPlanTabs } from './constants'
import { FamilyInternalMedicineAssessmentPlanTab } from './family-internal-medicine-assessment-plan-tab'
import { PsychiatryAssessmentPlanTab } from './psychiatry-assessment-plan-tab'
import { useStore } from './store'
import { TherapyAssessmentPlanTab } from './therapy-assessment-plan-tab'

interface AssessmentPlanViewProps {
  patientId: string
  psychiatryAssessmentPlanData: QuickNoteSectionItem[]
  therapyAssessmentPlanData: QuickNoteSectionItem[]
  familyInternalMedicineAssessmentPlanData: QuickNoteSectionItem[]
  addOnAssessementPlanData: QuickNoteSectionItem[]
}

const AssessmentPlanView = ({
  patientId,
  psychiatryAssessmentPlanData,
  therapyAssessmentPlanData,
  familyInternalMedicineAssessmentPlanData,
  addOnAssessementPlanData,
}: AssessmentPlanViewProps) => {
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
          <TabsTrigger value={AssessmentPlanTabs.PAP}>
            {AssessmentPlanTabs.PAP}
          </TabsTrigger>
          <TabsTrigger value={AssessmentPlanTabs.TAP}>
            {AssessmentPlanTabs.TAP}
          </TabsTrigger>
          <TabsTrigger value={AssessmentPlanTabs.FIMAP}>
            {AssessmentPlanTabs.FIMAP}
          </TabsTrigger>
          <TabsTrigger value={AssessmentPlanTabs.AOAP}>
            {AssessmentPlanTabs.AOAP}
          </TabsTrigger>
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>
      <TabsContent value={AssessmentPlanTabs.PAP}>
        <PsychiatryAssessmentPlanTab
          patientId={patientId}
          psychiatryAssessmentPlanData={psychiatryAssessmentPlanData}
          isPsychiatryAssessmentPlanTab={true}
        />
        <AlertDialog />
      </TabsContent>
      <TabsContent value={AssessmentPlanTabs.TAP}>
        <TherapyAssessmentPlanTab
          patientId={patientId}
          therapyAssessmentPlanData={therapyAssessmentPlanData}
          isTherapyAssessmentPlanTab={true}
        />
        <AlertDialog />
      </TabsContent>
      <TabsContent value={AssessmentPlanTabs.FIMAP}>
        <FamilyInternalMedicineAssessmentPlanTab
          patientId={patientId}
          familyInternalMedicineAssessmentPlanData={
            familyInternalMedicineAssessmentPlanData
          }
          isFamilyInternalMedicineAssessmentPlanTab={true}
        />
        <AlertDialog />
      </TabsContent>
      <TabsContent value={AssessmentPlanTabs.AOAP}>
        <AddOnView
          patientId={patientId}
          addOnAssessementPlanData={addOnAssessementPlanData}
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

export { AssessmentPlanView }
