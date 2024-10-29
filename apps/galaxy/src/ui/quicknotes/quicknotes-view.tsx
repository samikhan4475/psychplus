import { Flex, ScrollArea } from '@radix-ui/themes'
import { PatientAllergiesWidget } from '@/ui/allergy'
import { AssessmentPlanWidget } from '@/ui/assessment'
import { CodesWidget } from '@/ui/codes'
import { FamilyPsychHxWidget } from '@/ui/family-psych-hx'
import { HpiWidget } from '@/ui/hpi'
import { InteractiveComplexityWidget } from '@/ui/interactive-complexity'
import { PatientMedicationsWidget } from '@/ui/medications'
import { MseWidget } from '@/ui/mse'
import { PastMedicalHxWidget } from '@/ui/past-medical-hx'
import { PastPsychHxWidget } from '@/ui/past-psych-hx'
import { QuestionnairesWidget } from '@/ui/questionnaires/questionnaires-widget'
import { PatientReferralsWidget } from '@/ui/referrals'
import { RosWidget } from '@/ui/ros'
import { SocialHxWidget } from '@/ui/social-hx'
import { SubstanceUseHxWidget } from '@/ui/substance-use-hx'
import { QuicknotesDiagnosisWidget } from '../diagnosis/quicknotes-diagnosis-widget'
import { FollowUpWidget } from '../follow-up'
import { PhysicalExamWidget } from '../physical-exam'
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
            <QuestionnairesWidget patientId={patientId} />
            <RosWidget patientId={patientId} />
            <QuicknotesVitalsWidget patientId={patientId} />
            <MseWidget patientId={patientId} />
            <QuicknotesDiagnosisWidget patientId={patientId} />
            <PhysicalExamWidget patientId={patientId} />
            <AssessmentPlanWidget patientId={patientId} />
            <InteractiveComplexityWidget patientId={patientId} />
            <PatientMedicationsWidget patientId={patientId} />
            <PatientReferralsWidget patientId={patientId} />
            <FollowUpWidget patientId={patientId} />
            <CodesWidget patientId={patientId} />
          </Flex>
        </ScrollArea>
        <ActualNoteView patientId={patientId} />
      </Flex>
    </Flex>
  )
}

export { QuickNotesView }
