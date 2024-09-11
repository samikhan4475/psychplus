import { QuestionnairesView } from '@/ui/questionnaires'
import { getQuestionnairesDashboard } from '@/ui/questionnaires/dashboard-tab/dashboard-widget/api'
import { getQuestionnairesGad7 } from '@/ui/questionnaires/gad-7-tab/api/get-questionnaires-gad7'

interface QuestionnairesPageProps {
  params: {
    id: string
  }
}

const QuestionnairesInfoPage = async ({ params }: QuestionnairesPageProps) => {
  const [questionnairesDashboardResponse, questionnairesGad7Response] =
    await Promise.all([
      getQuestionnairesDashboard({
        patientId: params.id,
      }),
      getQuestionnairesGad7({ patientId: params.id }),
    ])

  if (questionnairesDashboardResponse.state === 'error') {
    throw new Error(questionnairesDashboardResponse.error)
  }

  if (questionnairesGad7Response.state === 'error') {
    throw new Error(questionnairesGad7Response.error)
  }

  return (
    <QuestionnairesView
      questionnairesDashboardData={
        questionnairesDashboardResponse.data.questionnairesDashboardData
      }
      questionnairesGad7Data={
        questionnairesGad7Response.data.questionnairesGad7Data
      }
    />
  )
}

export default QuestionnairesInfoPage
