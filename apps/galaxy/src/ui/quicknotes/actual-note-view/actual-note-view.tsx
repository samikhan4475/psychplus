import { Flex, ScrollArea } from '@radix-ui/themes'
import { ActualNoteViewClient } from './actual-note-client'
import { CodesDetailsView } from './codes'
import { FamilyInternalMedicineAssessmentPlanView } from './family-internal-medicine-assessment-plan'
import { FamilyPsychDetailView } from './family-psych-hx'
import { FollowUp } from './follow-up'
import { HpiDetailView } from './hpi'
import { Injection } from './injection'
import { InteractiveComplexity } from './interactive-complexity'
import { Medications } from './medications'
import { MentalStatusExamHx } from './mental-status-exam-hx'
import { NoteViewHeader } from './note-view-header'
import { PastMedicalHx } from './past-medical-hx'
import { PastPsychlDetailView } from './past-psych-hx'
import { AllergiesDetailsView } from './patient-allergies'
import { PhysicalExamView } from './physical-exam'
import { PsychiatricEvaluation } from './psychiatric-evaluation'
import { PsychiatryAssessmentPlanView } from './psychiatry-assessment-plan'
import { Psychoanalysis } from './psychoanalysis'
import { Question } from './question'
import { Referral } from './referral'
import { ReviewOfSystem } from './ros'
import { SocialHx } from './social-hx'
import { SubstanceUseHx } from './substance-use-hx'
import { Therapy } from './therapy'
import { TherapyAssessmentPlanView } from './therapy-assessment-plan'
import { VitalsView } from './vitals'
import { WorkingDiagnosisDetailView } from './working-diagnosis'

interface ActualNoteViewProps {
  patientId: string
  appointmentId: string
}
const ActualNoteView = ({ patientId, appointmentId }: ActualNoteViewProps) => {
  return (
    <ActualNoteViewClient>
      <ScrollArea className="h-full w-96">
        <NoteViewHeader />
        <Flex gap="1" p="2" className="bg-white" direction="column">
          <PsychiatricEvaluation />
          <HpiDetailView patientId={patientId} />
          <PastPsychlDetailView patientId={patientId} />
          <FamilyPsychDetailView patientId={patientId} />
          <SocialHx />
          <SubstanceUseHx />
          <PastMedicalHx patientId={patientId} />
          <AllergiesDetailsView patientId={patientId} />
          <Question />
          <ReviewOfSystem patientId={patientId} />
          <VitalsView patientId={patientId} appointmentId={appointmentId} />
          <WorkingDiagnosisDetailView patientId={patientId} />
          <MentalStatusExamHx patientId={patientId} />
          <Psychoanalysis />
          <Injection />
          <InteractiveComplexity />
          <Medications />
          <Referral />
          <CodesDetailsView patientId={patientId} />
          <FollowUp patientId={patientId} appointmentId={appointmentId} />
          <Therapy patientId={patientId} />
          <PsychiatryAssessmentPlanView patientId={patientId} />
          <TherapyAssessmentPlanView patientId={patientId} />
          <FamilyInternalMedicineAssessmentPlanView patientId={patientId} />
          <PhysicalExamView patientId={patientId} />
        </Flex>
      </ScrollArea>
    </ActualNoteViewClient>
  )
}

export { ActualNoteView }
