import { PatientsQuestionnairesView } from '@/events/patients'
import { QuestionnaireType } from '@/events/patients/questionnaires/constants'

interface PatientsQuestionnairesProps {
  params: { id: string; type: keyof typeof QuestionnaireType }
}
const PatientsQuestionnairesPage = ({
  params,
}: PatientsQuestionnairesProps) => (
  <PatientsQuestionnairesView
    patientId={params.id}
    questionnaireType={params.type}
  />
)

export default PatientsQuestionnairesPage
