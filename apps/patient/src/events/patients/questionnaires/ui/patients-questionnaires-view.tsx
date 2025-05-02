import { Container } from '@radix-ui/themes'
import { AppointmentsCancelled } from '@/events/appointments/confirmations/ui/appointments-cancelled'
import { NoteSectionName } from '@/features/note/constants'
import { NoteStoreProvider } from '@/features/note/store'
import { getQuestionnaireStatus } from '@/features/questionnaire/api'
import { QuestionnaireType } from '../constants'
import { PatientsQuestionnairesSection } from './patients-questionnaires-section'

interface PatientsQuestionnairesViewProps {
  patientId: string
  questionnaireType: keyof typeof QuestionnaireType
}

const PatientsQuestionnairesView = async ({
  patientId,
  questionnaireType,
}: PatientsQuestionnairesViewProps) => {
  const questionnaireSection = QuestionnaireType[questionnaireType]
  const response = await getQuestionnaireStatus({
    pId: patientId,
    sectionName: [questionnaireSection],
  })

  return (
    <NoteStoreProvider notes={[]}>
      <Container className="w-full px-6">
        {response.state === 'success' ? (
          <AppointmentsCancelled message="Your questionnaire is already filled!" />
        ) : (
          <PatientsQuestionnairesSection
            questionnaireData={[]}
            questionnaireSection={questionnaireSection as NoteSectionName}
          />
        )}
      </Container>
    </NoteStoreProvider>
  )
}

export { PatientsQuestionnairesView }
