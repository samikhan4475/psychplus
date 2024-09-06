import { QuestionnairesView } from '@/ui/questionnaires'
import { getQuestionnairesDashboard } from '@/ui/questionnaires/dashboard-tab/dashboard-widget/api'

interface QuestionnairesPageProps {
  params: {
    id: string
  }
}

const QuestionnairesInfoPage = async ({ params }: QuestionnairesPageProps) => {
  const questionnairesDashboardResponse = await getQuestionnairesDashboard({
    patientId: params.id,
  })

  if (questionnairesDashboardResponse.state === 'error') {
    throw new Error(questionnairesDashboardResponse.error)
  }

  return (
    <QuestionnairesView
      questionnairesDashboardData={
        questionnairesDashboardResponse.data.questionnairesDashboardData
      }
    />
  )
}

export default QuestionnairesInfoPage
