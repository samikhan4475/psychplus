'use client'

import { useEffect, useMemo } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { Appointment, QuickNoteSectionItem, Relationship } from '@/types'
import { validateYesNoEnum } from '../mse/mse-widget/utils'
import { QuickNoteSectionName } from '../quicknotes/constants'
import { AlertDialog } from './alert-dialog'
import { AssessmentPlanTabs } from './constants'
import { FamilyInternalMedicineAssessmentPlanTab } from './family-internal-medicine-assessment-plan-tab'
import { PsychiatryAssessmentPlanTab } from './psychiatry-assessment-plan-tab'
import { SafetyPlanningAndInterventionTab } from './safety-planning-and-intervention-tab'
import { useStore } from './store'
import { TherapyAssessmentPlanTab } from './therapy-assessment-plan-tab'

interface AssessmentPlanViewProps {
  patientId: string
  appointment: Appointment
  patientRelationships: Relationship[]
  sectionsData: QuickNoteSectionItem[]
}

enum ProviderType {
  Psychiatry = 'Psychiatrist',
  Therapy = 'Therapy',
  InternalMedicine = 'InternalMedicine',
  FamilyMedicine = 'FamilyMedicine',
}
const getSectionsData = (
  sectionsData: QuickNoteSectionItem[],
  sectionName: QuickNoteSectionName,
) => {
  return sectionsData?.filter((section) => section.sectionName === sectionName)
}

const AssessmentPlanView = ({
  appointment,
  patientId,
  patientRelationships,
  sectionsData,
}: AssessmentPlanViewProps) => {
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))

  const psychiatryAssessmentPlanData = getSectionsData(
    sectionsData,
    QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
  )

  const therapyAssessmentPlanData = getSectionsData(
    sectionsData,
    QuickNoteSectionName.QuicknoteSectionTherapyAssessmentPlan,
  )

  const familyInternalMedicineAssessmentPlanData = getSectionsData(
    sectionsData,
    QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
  )

  const mseData = getSectionsData(
    sectionsData,
    QuickNoteSectionName.QuicknoteSectionMse,
  )

  const safetyPlanningBoolean =
    psychiatryAssessmentPlanData?.find(
      (item) => item.sectionItem === 'safetyPlanningIntervention',
    )?.sectionItemValue === 'true'

  const isEnabled = useMemo(() => {
    const tcsiYesNo =
      mseData?.find((item) => item.sectionItem === 'tcsiYesNo')
        ?.sectionItemValue ?? ''
    return validateYesNoEnum(tcsiYesNo) === 'yes'
  }, [mseData])

  const shouldShowSafety = safetyPlanningBoolean || isEnabled

  useEffect(() => {
    if (
      !shouldShowSafety &&
      appointment.providerType === ProviderType.Psychiatry
    ) {
      setActiveTab(AssessmentPlanTabs.PAP)
    }
  }, [shouldShowSafety, setActiveTab])

  let renderTab = null
  switch (appointment.providerType) {
    case ProviderType.Psychiatry:
      renderTab = (
        <>
          <TabsContent value={AssessmentPlanTabs.PAP}>
            <PsychiatryAssessmentPlanTab
              sectionsData={sectionsData}
              appointment={appointment}
              patientId={patientId}
              isPsychiatryAssessmentPlanTab={true}
            />
          </TabsContent>
          {shouldShowSafety && (
            <TabsContent value={AssessmentPlanTabs.SPAI}>
              <SafetyPlanningAndInterventionTab
                patientRelationships={patientRelationships}
                mseData={mseData}
                patientId={patientId}
                psychiatryAssessmentPlanData={psychiatryAssessmentPlanData}
                isSafetyPlanningAndInterventionTab={true}
              />
            </TabsContent>
          )}
          <AlertDialog />
        </>
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
              appointment={appointment}
              patientId={patientId}
              sectionsData={sectionsData}
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
          {appointment.providerType === ProviderType.Psychiatry &&
            shouldShowSafety && (
              <TabsTrigger value={AssessmentPlanTabs.SPAI}>
                {AssessmentPlanTabs.SPAI}
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

export { AssessmentPlanView, ProviderType }
