import { Flex, ScrollArea } from '@radix-ui/themes'
import { AddOnWidget } from '@/ui/add-on'
import { PatientAllergiesWidget } from '@/ui/allergy'
import { AssessmentPlanWidget } from '@/ui/assessment'
import { CodesWidget } from '@/ui/codes'
import { FamilyPsychHxWidget } from '@/ui/family-psych-hx'
import { HpiWidget } from '@/ui/hpi'
import { PatientMedicationsWidget } from '@/ui/medications'
import { MseWidget } from '@/ui/mse'
import { PastMedicalHxWidget } from '@/ui/past-medical-hx'
import { PastPsychHxWidget } from '@/ui/past-psych-hx'
import { QuestionnairesWidget } from '@/ui/questionnaires'
import { PatientReferralsWidget } from '@/ui/referrals'
import { RosWidget } from '@/ui/ros'
import { SocialHxWidget } from '@/ui/social-hx'
import { SubstanceUseHxWidget } from '@/ui/substance-use-hx'
import { TherapyWidget } from '@/ui/therapy'
import { AlertDialog } from '../assessment-plan/alert-dialog'
import { FamilyInternalMedicineAssessmentPlanWidget } from '../assessment-plan/family-internal-medicine-assessment-plan-tab/family-internal-medicine-assessment-plan-widget'
import { PsychiatryAssessmentPlanWidget } from '../assessment-plan/psychiatry-assessment-plan-tab/psychiatry-assessment-plan-widget'
import { TherapyAssessmentPlanWidget } from '../assessment-plan/therapy-assessment-plan-tab/therapy-assessment-plan-widget'
import { QuicknotesDiagnosisWidget } from '../diagnosis/quicknotes-diagnosis-widget'
import { QuicknotesFollowUpWidget } from '../follow-up'
import { PhysicalExamWidget } from '../physical-exam'
import { EctWidgetLoader as EctWidget } from '../procedures/ect-tab/ect-widget-loader'
import { TmsWidgetLoader as TmsWidget } from '../procedures/tms-tab/tms-widget-loader'
import { QuicknotesVitalsWidget } from '../vitals'
import { ActualNoteView } from './actual-note-view'
import { QuickNotesHeader } from './quicknotes-header'
import { QuickNotesSaver } from './quicknotes-saver'

interface QuickNotesViewProps {
  patientId: string
  appointmentId: string
}

const QuickNotesView = ({ patientId, appointmentId }: QuickNotesViewProps) => {
  return (
    <Flex width="100%" direction="column">
      <QuickNotesSaver />
      <QuickNotesHeader appointmentId={appointmentId} />
      <Flex className="h-full max-h-[calc(100dvh_-_385px)] w-full">
        <ScrollArea className="h-full pr-3" type="always" scrollbars="vertical">
          <Flex direction="column" height="100%" gap="2">
            <HpiWidget patientId={patientId} />
            <PastPsychHxWidget patientId={patientId} />
            <FamilyPsychHxWidget patientId={patientId} />
            <SocialHxWidget patientId={patientId} />
            <SubstanceUseHxWidget patientId={patientId} />
            <PastMedicalHxWidget patientId={patientId} />
            <PatientAllergiesWidget patientId={patientId} />
            <RosWidget patientId={patientId} />
            <QuicknotesVitalsWidget patientId={patientId} />
            <MseWidget patientId={patientId} />
            <QuicknotesDiagnosisWidget patientId={patientId} />
            <QuestionnairesWidget />
            <PhysicalExamWidget patientId={patientId} />
            <PsychiatryAssessmentPlanWidget patientId={patientId} />
            <TherapyAssessmentPlanWidget patientId={patientId} />
            <FamilyInternalMedicineAssessmentPlanWidget patientId={patientId} />
            <AddOnWidget patientId={patientId} />
            <PatientMedicationsWidget patientId={patientId} />
            <PatientReferralsWidget patientId={patientId} />
            <QuicknotesFollowUpWidget patientId={patientId} />
            <CodesWidget patientId={patientId} />
            <TherapyWidget patientId={patientId} />
            <EctWidget patientId={patientId} />
            <TmsWidget patientId={patientId} />
          </Flex>
        </ScrollArea>
        <ActualNoteView patientId={patientId} appointmentId={appointmentId} />
      </Flex>
    </Flex>
  )
}

export { QuickNotesView }
