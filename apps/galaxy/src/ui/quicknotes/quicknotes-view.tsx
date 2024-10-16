import { Flex } from '@radix-ui/themes'
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
import { VitalsWidget } from '@/ui/vitals'
import { QuicknotesDiagnosisWidget } from '../diagnosis/quicknotes-diagnosis-widget'
import { FollowUpWidget } from '../follow-up'
import { PhysicalExamWidget } from '../physical-exam'
import { QuickNotesHeader } from './quicknotes-header'
import { QuickNotesSaver } from './quicknotes-saver'

interface QuickNotesViewProps {
  patientId: string
}

const QuickNotesView = ({ patientId }: QuickNotesViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <QuickNotesSaver />
      <QuickNotesHeader />
      <Flex direction="column" gap="2">
        <HpiWidget patientId={patientId} />
        <PastPsychHxWidget patientId={patientId} />
        <FamilyPsychHxWidget patientId={patientId} />
        <SocialHxWidget patientId={patientId} />
        <SubstanceUseHxWidget patientId={patientId} />
        <PastMedicalHxWidget patientId={patientId} />
        <PatientAllergiesWidget patientId={patientId} />
        <QuestionnairesWidget patientId={patientId} />
        <RosWidget patientId={patientId} />
        <VitalsWidget patientId={patientId} />
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
    </Flex>
  )
}

export { QuickNotesView }
