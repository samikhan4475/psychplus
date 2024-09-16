import { QuestionnairesView } from '@/ui/questionnaires'
import { getQuestionnairesDashboard } from '@/ui/questionnaires/dashboard-tab/dashboard-widget/api'
import { getQuestionnairesGad7 } from '@/ui/questionnaires/gad-7-tab/api/get-questionnaires-gad7'
import { getQuestionnairesPcl5 } from '@/ui/questionnaires/pcl-5-tab/api'
import { getQuestionnairesPhq9 } from '@/ui/questionnaires/phq-9-tab/api'

interface QuestionnairesPageProps {
  params: {
    id: string
  }
}

const QuestionnairesInfoPage = async ({ params }: QuestionnairesPageProps) => {
  const [
    questionnairesDashboardResponse,
    questionnairesGad7Response,
    questionnairesPcl5Response,
    questionnairesPhq9DataResponse,
  ] = await Promise.all([
    getQuestionnairesDashboard({ patientId: params.id }),
    getQuestionnairesGad7({ patientId: params.id }),
    getQuestionnairesPcl5({ patientId: params.id }),
    getQuestionnairesPhq9({ patientId: params.id }),
  ])

  if (questionnairesDashboardResponse.state === 'error') {
    throw new Error(questionnairesDashboardResponse.error)
  }

  if (questionnairesGad7Response.state === 'error') {
    throw new Error(questionnairesGad7Response.error)
  }

  if (questionnairesPcl5Response.state === 'error') {
    throw new Error(questionnairesPcl5Response.error)
  }

  if (questionnairesPhq9DataResponse.state === 'error') {
    throw new Error(questionnairesPhq9DataResponse.error)
  }

  return (
    <QuestionnairesView
      questionnairesDashboardData={
        questionnairesDashboardResponse.data.questionnairesDashboardData
      }
      questionnairesGad7Data={
        questionnairesGad7Response.data.questionnairesGad7Data
      }
      questionnairesPcl5Data={
        questionnairesPcl5Response.data.questionnairesPcl5Data
      }
      questionnairesPhq9Data={
        questionnairesPhq9DataResponse.data.questionnairesPhq9Data
      }
    />
  )
}

export default QuestionnairesInfoPage
