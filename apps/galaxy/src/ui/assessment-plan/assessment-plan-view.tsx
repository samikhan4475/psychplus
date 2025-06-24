'use client'

import { useEffect } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { VisitTypeEnum } from '@/enum'
import { Appointment, QuickNoteSectionItem, Relationship } from '@/types'
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
export const getSectionsData = (
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
  const { visitTypeCode } = appointment
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))

  const safetyPlanningInterventionData = getSectionsData(
    sectionsData,
    QuickNoteSectionName.QuicknoteSectionSafetyPlanningIntervention,
  )

  const therapyAssessmentPlanData = getSectionsData(
    sectionsData,
    QuickNoteSectionName.QuicknoteSectionTherapyAssessmentPlan,
  )

  const familyInternalMedicineAssessmentPlanData = getSectionsData(
    sectionsData,
    QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
  )

  const psychiatryVisitTypes = [
    VisitTypeEnum.Outpatient,
    VisitTypeEnum.ResidentCare,
    VisitTypeEnum.TransitionalCare,
    VisitTypeEnum.EdVisit,
    VisitTypeEnum.HospitalCareInitial,
  ]
  const psychiatryAssessmentPlanSection = visitTypeCode
    ? psychiatryVisitTypes.includes(visitTypeCode as VisitTypeEnum)
    : false
  const individualPsychotherapy =
    visitTypeCode === VisitTypeEnum.IndividualPsychotherapy
  const familyPsychotherapy =
    visitTypeCode === VisitTypeEnum.FamilyPsychotherapy

  useEffect(() => {
    const { visitTypeCode } = appointment

    const tabMap: Record<string, AssessmentPlanTabs> = {
      psychiatry: AssessmentPlanTabs.PAP,
      therapy: AssessmentPlanTabs.TAP,
      familyMedicine: AssessmentPlanTabs.FIMAP,
    }

    const tab =
      visitTypeCode && tabMap[visitTypeCode.toLowerCase()]
        ? tabMap[visitTypeCode.toLowerCase()]
        : AssessmentPlanTabs.PAP

    setActiveTab(tab)
  }, [setActiveTab])

  let renderTab = null
  switch (appointment.visitTypeCode) {
    case VisitTypeEnum.Outpatient:
    case VisitTypeEnum.ResidentCare:
    case VisitTypeEnum.TransitionalCare:
    case VisitTypeEnum.EdVisit:
    case VisitTypeEnum.HospitalCareInitial:
      renderTab = (
        <>
          <TabsContent value={AssessmentPlanTabs.PAP}>
            <PsychiatryAssessmentPlanTab
              sectionsData={sectionsData}
              appointment={appointment}
              patientId={patientId}
            />
          </TabsContent>
          <TabsContent value={AssessmentPlanTabs.SPAI}>
            <SafetyPlanningAndInterventionTab
              patientRelationships={patientRelationships}
              safetyPlanningInterventionData={safetyPlanningInterventionData}
              patientId={patientId}
              isSafetyPlanningAndInterventionTab={true}
              appointment={appointment}
            />
          </TabsContent>
          <AlertDialog />
        </>
      )
      break
    case VisitTypeEnum.IndividualPsychotherapy:
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
    case VisitTypeEnum.FamilyPsychotherapy:
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
          {psychiatryAssessmentPlanSection && (
            <TabsTrigger value={AssessmentPlanTabs.PAP}>
              {AssessmentPlanTabs.PAP}
            </TabsTrigger>
          )}
          <TabsTrigger value={AssessmentPlanTabs.SPAI}>
            {AssessmentPlanTabs.SPAI}
          </TabsTrigger>

          {individualPsychotherapy && (
            <TabsTrigger value={AssessmentPlanTabs.TAP}>
              {AssessmentPlanTabs.TAP}
            </TabsTrigger>
          )}
          {familyPsychotherapy && (
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
