'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { Appointment, QuickNoteSectionItem } from '@/types'
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
  tcmData: QuickNoteSectionItem[]
  appointment: Appointment
}

enum ProviderType {
  Psychiatry = 'Psychiatrist',
  Therapy = 'Therapy',
  InternalMedicine = 'InternalMedicine',
  FamilyMedicine = 'FamilyMedicine',
}

const AssessmentPlanView = ({
  patientId,
  psychiatryAssessmentPlanData,
  therapyAssessmentPlanData,
  familyInternalMedicineAssessmentPlanData,
  appointment,
}: AssessmentPlanViewProps) => {
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))

  let renderTab = null
  switch (appointment.providerType) {
    case ProviderType.Psychiatry:
      renderTab = (
        <TabsContent value={AssessmentPlanTabs.PAP}>
          <PsychiatryAssessmentPlanTab
            patientId={patientId}
            psychiatryAssessmentPlanData={psychiatryAssessmentPlanData}
            isPsychiatryAssessmentPlanTab={true}
          />
          <AlertDialog />
        </TabsContent>
      )
      break
    case ProviderType.Therapy:
      renderTab = (
        <TabsContent value={AssessmentPlanTabs.TAP}>
          <TherapyAssessmentPlanTab
            patientId={patientId}
            therapyAssessmentPlanData={therapyAssessmentPlanData}
            isTherapyAssessmentPlanTab={true}
          />
          <AlertDialog />
        </TabsContent>
      )
      break
    case ProviderType.InternalMedicine:
    case ProviderType.FamilyMedicine:
      renderTab = (
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
      )
      break
    default:
      renderTab = (
        <>
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
        </>
      )
  }

  return (
    <Tabs.Root
      className="flex w-full flex-col"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <Flex>
        <Tabs.List>
          {appointment.providerType === ProviderType.Psychiatry && (
            <TabsTrigger value={AssessmentPlanTabs.PAP}>
              {AssessmentPlanTabs.PAP}
            </TabsTrigger>
          )}
          {appointment.providerType === ProviderType.Therapy && (
            <TabsTrigger value={AssessmentPlanTabs.TAP}>
              {AssessmentPlanTabs.TAP}
            </TabsTrigger>
          )}
          {[
            ProviderType.InternalMedicine as string,
            ProviderType.FamilyMedicine as string,
          ].includes(appointment.providerType) && (
            <TabsTrigger value={AssessmentPlanTabs.FIMAP}>
              {AssessmentPlanTabs.FIMAP}
            </TabsTrigger>
          )}
          {![
            ProviderType.InternalMedicine as string,
            ProviderType.FamilyMedicine as string,
            ProviderType.Psychiatry as string,
            ProviderType.Therapy as string,
          ].includes(appointment.providerType) && (
            <>
              <TabsTrigger value={AssessmentPlanTabs.PAP}>
                {AssessmentPlanTabs.PAP}
              </TabsTrigger>
              <TabsTrigger value={AssessmentPlanTabs.TAP}>
                {AssessmentPlanTabs.TAP}
              </TabsTrigger>
              <TabsTrigger value={AssessmentPlanTabs.FIMAP}>
                {AssessmentPlanTabs.FIMAP}
              </TabsTrigger>
            </>
          )}
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>
      {renderTab}
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
