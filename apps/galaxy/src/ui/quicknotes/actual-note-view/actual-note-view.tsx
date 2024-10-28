import { Flex, ScrollArea } from '@radix-ui/themes'
import { ActualNoteViewClient } from './actual-note-client'
import { Allergies } from './allergies'
import { Codes } from './codes'
import { FamilyPsychDetailView } from './family-psych-hx'
import { FollowUp } from './follow-up'
import { HpiDetailView } from './hpi'
import { Injection } from './injection'
import { InteractiveComplexity } from './interactive-complexity'
import { Medications } from './medications'
import { MentalStatusExam } from './mental-status-exam'
import { NoteViewHeader } from './note-view-header'
import { PastMedicalHx } from './past-medical-hx'
import { PastPsychlDetailView } from './past-psych-hx'
import { PsychiatricEvaluation } from './psychiatric-evaluation'
import { PsychiatristPlan } from './psychiatrist-plan'
import { Psychoanalysis } from './psychoanalysis'
import { Question } from './question'
import { Referral } from './referral'
import { ReviewOfSystem } from './ros'
import { SocialHx } from './social-hx'
import { SubstanceUseHx } from './substance-use-hx'
import { TherapistPlan } from './therapist-plan'
import { VitalsTable } from './vitals-table'
import { WorkingDiagnosis } from './working-diagnosis'

interface ActualNoteViewProps {
  patientId: string
}
const ActualNoteView = ({ patientId }: ActualNoteViewProps) => {
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
          <PastMedicalHx />
          <Allergies />
          <Question />
          <ReviewOfSystem />
          <VitalsTable />
          <MentalStatusExam />
          <WorkingDiagnosis />
          <PsychiatristPlan />
          <TherapistPlan />
          <Psychoanalysis />
          <Injection />
          <InteractiveComplexity />
          <Medications />
          <Referral />
          <FollowUp />
          <Codes />
        </Flex>
      </ScrollArea>
    </ActualNoteViewClient>
  )
}

export { ActualNoteView }
